#自动打包脚本，命令行传入一个参数 ：内网、测试网关、正式网关，根据参数来更改相应的文件并自动打包，然后微信登录，发送给曹庆军（环境要求: python3, itchat包）
import re
import sys
import os
import zipdir
import itchat
import time
def readline(path):
    with open(path, 'r', encoding='utf8') as f:
        line = f.readlines()
    return line
def handleApiList(lines, option): #lines每行的字符串，option:打包选项：内网， 测试网关，正式网关,MOCK
    let = re.compile('\s*let')
    option = re.compile(option)
    for i in range(0, 6):
        if let.match(lines[i]) != None:
            lines[i] = '// ' + lines[i]
    for i in range(0, 6):
        if len(option.findall(lines[i])) > 0:
            lines[i] = lines[i][3:]
    return lines
def handleApp(lines, option):
    comment = re.compile('//')
    if comment.match(lines[4]) == None:
        lines[4] = '// ' + lines[4]
    if(option == '测试网关' or option == '正式网关'):
        lines[23] = '            isSuccess: false,//网关改false;\n'
    else:
        lines[23] = '            isSuccess: true,//网关改false;\n'
    return lines
def writeFile(path, lines):
    with open(path, 'w', encoding='utf8') as f:
        for line in lines:
            f.write(line)
def resetApp(lines):
    comment = re.compile('//')
    if comment.match(lines[4]) != None:
        lines[4] = lines[4][3:]
    lines[23] = '            isSuccess: true,//网关改false;\n'
    return lines
option = sys.argv[1]
#修改前commit到git仓库
now = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
os.system('git add --all')
os.system('git commit -m\"' + now + ' 打包前备份\"')
#处理apilist
lines = readline('./src/config/apiList.js')
lines = handleApiList(lines, option)
writeFile('./src/config/apiList.js', lines)
#处理app.jsx
lines = readline('./src/components/App.jsx')
lines = handleApp(lines, option)
writeFile('./src/components/App.jsx', lines)
#打包
os.system('npm run build')
print('打包完毕') 
filename = 'dist移动-' + option + '.zip'
#压缩
zipdir.zip_file_path('./dist', '../', filename)
print('压缩完毕')
#重置app.jsx
lines = readline('./src/components/App.jsx')
lines = resetApp(lines)
writeFile('./src/components/App.jsx', lines)
lines = readline('./src/config/apiList.js')
#重置apilist
lines = handleApiList(lines, 'MOCK')
writeFile('./src/config/apiList.js', lines)
print('重置成功')
# 微信发包
itchat.auto_login(hotReload=True)
cao = itchat.search_friends(name='网云-曹庆军')
itchat.send_file(r"../" + filename , cao[0].UserName)
print('发送完成')

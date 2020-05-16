#提交代码
import os;
import sys;
describe = sys.argv[1]
os.system('git add --all')
os.system('git commit -m\"' + describe + '\"')
os.system('git push')


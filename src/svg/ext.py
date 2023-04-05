# import os
currDir= 'C:/Users/khi/Desktop/Tutorial/folder1/mern-facebook-clone/frontend/src/svg/'
# arr= os.listdir(currDir)
# print(arr)
# for filename in arr:
#     base = os.path.splitext(currDir+ "/"+filename)[0]
#     print(base)
#     os.rename(filename, base + ".html")
import glob
import os


def rename(f_path):
    filelist = glob.glob(f_path + "*")
    print(filelist)
    count = 0
    for file in filelist:
        print("File Count : ", count)
        filename = os.path.split(file)
        print(filename)
        new_filename = f_path + filename[1].split('.')[0] + ".jsx"
        os.rename(f_path+filename[1], new_filename)
        print(new_filename)
        count = count + 1

rename(currDir)
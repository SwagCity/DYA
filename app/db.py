import random, re, datetime
from pymongo import MongoClient

client = MongoClient()
db = client['swag'] 		#database called swag
users = db['users']   		#collection called users
stories = db['stories'] 	#collection called stories
#db.swag.drop()

def authenticate(username,password):
	#print [x for x in users.find()]
	return 1 == (users.find({'name':username,'pw':password})).count()

def userexists(username):
	return 1 == (users.find({'name':username})).count()

def emailexists(email):
	return 1 == (users.find({'email':email})).count()

def getcontacts(username):
	res = users.find({'name':{'$not':re.compile(username)}},{"_id":False})
	info = [x for x in res]
	return info
'''
def getblog(username):
	conn = Connection()
	db = conn['jsdt_blog']
	res = db.jsdt_blog.find({'name':{'$not':re.compile(username)}},{"_id":False})
	info = [x for x in res]
	return reversed(info)

def getblogcontent(title):
	conn = Connection()
	db = conn['jsdt_blog']
	res = db.jsdt_blog.find({'title':title},{"_id":False})
	return res
'''
def getprofile(username):
	res = users.find({'name':username},{"_id":False})
	info = [x for x in res]
	return info
'''
def getposts(username):
	conn = Connection()
	db = conn['jsdt_blog']
	res = db.jsdt_blog.find({'author':username},{"_id":False})
	info = [x for x in res]
	return reversed(info)
'''
def updatepw(username,newpw):
	users.update({'name':username},{'$set':{'pw':newpw}})

def adduser(display, username,email,password):
	users.insert([{'disp':display,'name':username,'email':email,'pw':password}])
'''
def invalidpost(title, content):
	conn = Connection()
	db = conn['jsdt_blog']
	valid = (0 == (db.jsdt_blog.find({'title':title})).count())
	valid = valid and len(content) > 0 and len(title)>0

	return not(valid)

def invalidcomment(comment):
	return len(comment)==0

def addpost(title, username,content):
	conn = Connection()
	db = conn['jsdt_blog']
	now = datetime.datetime.now()
	db.jsdt_blog.insert([{'title':title,'author':username,'content':content, 'comments':[], 'time':[now.month,now.day,now.year,now.hour,now.minute]}])

def addcomment(title, username,comment):
	conn = Connection()
	db = conn['jsdt_blog']
	now = datetime.datetime.now()
	newcomment = [comment,username,[now.month,now.day,now.year,now.hour,now.minute]]
	print newcomment
	print title
	db.jsdt_blog.update({'title':title},{'$push':{'comments':newcomment}})

def votepost(title,points):
	conn = Connection()
	db = conn['jsdt_blog']
	db.jsdt_blog.update({'title':title},{'$inc':{'points':points}})
'''

# if __name__ == '__main__':
# 	setup()

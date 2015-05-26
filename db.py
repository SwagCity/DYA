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

def getprofile(username):
        res = users.find({'name':username},{"_id":False})
        info = [x for x in res]
        return info

def updatepw(username,newpw):
        users.update({'name':username},{'$set':{'pw':newpwd}}, upsert=False, multi=False)

def adduser(display, username,email,password):
        users.insert([{'disp':display,'name':username,'email':email,'pw':password}])

def s_add(title, author, text, tags): #adding initial story (FIRST NODE)
        stories.insert([{'title':title,'author':author,'text':text,'tags':tags,'children':[]}])

def s_edit(id, title, text): #editing node text
        stories.update({"_id":ObjectId(i)}, {'title':title, 'text':text})

def s_delete(id):	#delete initial story (FIRST NODE)
        pass

def s_getall():	#get story by Object_Id
        return stories.find()

def s_get(i):	#get story by Object_Id
        return stories.find({"_id":ObjectId(i)})

import db
from functools import wraps
from flask import Flask, render_template, request, redirect, session, url_for, flash

app = Flask(__name__)

def login_required(f):
    @wraps(f)
    def inner(*args, **kwargs):
        if session["name"]==None:
            flash("You must login to access this protected page!")
            session['nextpage'] = request.url
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return inner

def authenticate(f):
    @wraps(f)
    def inner(*args, **kwargs):
        if request.method == "POST":
            username = request.form["username"]
            password = request.form["pw"]
            if db.authenticate(username,password):
                session['name'] = username
                #page = session.pop('nextpage','/')
                #return redirect(url_for('edit'))
            else:
                if db.userexists(username):
                    flash("You've inputted the wrong password for the given user.")
                    return redirect(url_for('login'))
                else:
                    flash("The username you inputted hasn't been registered yet.")
                    return redirect(url_for('login'))
        return f(*args, **kwargs)
    return inner

@app.route('/', methods=["POST","GET"])
@app.route('/index', methods=["POST","GET"])
def index():
    if "name" not in session or session["name"] == None:
        session["name"] = None
        return render_template("index.html")
    else:
        print session["name"]
        return redirect(url_for('home'))

@app.route('/home', methods=["POST","GET"])
@login_required
def home():
    if request.method == "GET":
        return render_template("home.html")
    else: #THIS NO WORK.
        mode = request.form['submit']
        print mode
        if mode == 'edit stories':
            return redirect(url_for('edit'))
        elif mode == 'view stories':
            return redirect(url_for('view')) #or whereever

        
@app.route('/edit')
@login_required
def edit():
    if request.method == "POST":
        id = request.form["_id"]
        title = request.form["title"]
        text = request.form["snippet"]
        db.s_edit(id, title, text)
    return render_template("edit.html")

@app.route("/login", methods=["POST","GET"])
@authenticate
def login():
    if "name" not in session:
        session["name"] = None
    if request.method == "POST":
        return redirect(url_for('user'))
    else:
        return render_template("login.html")

@app.route('/logout')
def logout():
    # remove the username from the session if it's there
    session.pop('name', None)
    flash("You have been logged out.")
    return redirect(url_for('login'))

@app.route("/register", methods=["POST","GET"])
def register():
    if request.method == "POST":
        disp = request.form["display"]
        user = request.form["username"]
        em = request.form["email"]
        pw = request.form["password"]
        pw2 = request.form["password2"]
        if pw != pw2:
            flash("The passwords you submitted don't match, please try again.")
            return redirect(url_for('register'))
        if user == "" or em == "" or pw == "":
            flash("Please fill out all required fields!")
            return redirect(url_for('register'))
        if disp == "":
            disp = user
        if db.userexists(user):
            flash("The username you submitted is already taken, please try again.")
            return redirect(url_for('register'))
        if db.emailexists(em):
            flash("The email you submitted already has an account tied to it, please try again.")
            return redirect(url_for('register'))
        else:
            db.adduser(disp, user,em,pw)
            print "registered as display " + disp + " and user " + user
            flash("You've sucessfully registered! Please login below.")
            return redirect(url_for('login'))
    else:
        if session['name']!=None:
            flash("You're already logged in, so you can't register for a second account!")
            page = session.pop('nextpage','/')
            return redirect(page)
        return render_template("register.html")

@app.route("/write",methods=["POST","GET"])
@login_required
def write():
    if request.method == "POST":
        title = request.form["title"]
        text = request.form["text"]
        author = session['name']
        db.s_add(title, author, text, [])
        return redirect(url_for('stories'))
    return render_template("write.html")

@app.route("/story")
@login_required
def stories():
    temp = db.s_getall()
    data = [x for x in temp]
    return render_template("story.html",data=data)

@app.route("/stories/<id>")
@login_required
def story():
    temp = db.s_get(id)
    data = [x for x in temp]
    return render_template("story.html",data=data)

@app.route("/user", methods=["POST","GET"])
@login_required
def user():
    name=db.getprofile(session['name'])
    if request.method == "GET":
         return render_template("user.html",name=name)
    else: #POST
        print "post method"
        oldpwd = request.form["oldpassword"]
        newpwd = request.form["newpassword"]
        newpwd2 = request.form["newpassword2"]
        print oldpwd
        if name[0]['pw'] != oldpwd:
            flash("You have entered the wrong password! Please try again.")
            return redirect(url_for('user'))
        if (newpwd != newpwd2):
            flash("The new passwords you submitted don't match, please try again.")
            return redirect(url_for('user'))
        if name[0]['pw'] == newpwd:
            flash("Please enter a new password.")
            return redirect(url_for('user'))
        else:
            db.updatepw(session['name'],newpwd)
            flash("Your password has been sucessfully changed. Please re-login.")
            return redirect(url_for('logout'))

if __name__ == '__main__':
    app.secret_key = "don't store this on github"
    app.debug = True
    app.run(host="0.0.0.0", port=8000)

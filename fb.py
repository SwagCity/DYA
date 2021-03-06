import db
from functools import wraps
from flask_oauth import OAuth
import facebook
from flask import Flask, render_template, request, redirect, session, url_for, flash

app = Flask(__name__)

##FACEBOOK GRAPH API
FACEBOOK_APP_ID = "1451287635189188"
FACEBOOK_APP_SECRET = "6b4f105043010bcb75a8b4eb37afa7bb"

oauth = OAuth()
facebook = oauth.remote_app('facebook',
    base_url='https://graph.facebook.com/',
    request_token_url=None,
    access_token_url='/oauth/access_token',
    authorize_url='https://www.facebook.com/dialog/oauth',
    consumer_key=FACEBOOK_APP_ID,
    consumer_secret=FACEBOOK_APP_SECRET,
    request_token_params={'scope': 'user_friends, email'}
)

def login_required(f):
    @wraps(f)
    def inner(*args, **kwargs):
        if session["name"]==None:
            flash("You must login to access this protected page!")
            session['nextpage'] = request.url
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
    if request.method=="POST":
        print "POST"
        if request.form['submit'] == "view stories":
            return redirect(url_for('view')) ##where is view?
        elif request.form['submit'] == "edit stories":
            return redirect(url_for('edit'))
    else: #GET
        return render_template("home.html")


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
def login():
    return facebook.authorize(callback=url_for('facebook_authorized',
    next=request.args.get('next') or request.referrer or None,
    _external=True))

@app.route('/login/authorized')
@facebook.authorized_handler
def facebook_authorized(resp):
    if resp is None:
        return 'Access denied: reason=%s error=%s' % (
            request.args['error_reason'],
            request.args['error_description']
        )
    session['oauth_token'] = (resp['access_token'], '')
    session['token'] = resp['access_token']
    me = facebook.get('/me')
    session['name'] = me.data['name']
    fburl = "https://graph.facebook.com/v2.2/me?access_token=" + urllib.quote_plus(str((session["token"])))
    req = urllib2.urlopen(fburl)
    result = req.read()
    d = json.loads(result)
    # a = open('sample.json').read()
    # d = json.loads(a)
    session['id'] = d['id']
    if not database.user_exists(session['id']):
        database.add_user(session['name'],session['id'])
        flash("Since you are a new user, please update your food preferences.")
        return redirect(url_for('account'))
    return redirect(url_for('index'))

@facebook.tokengetter
def get_facebook_oauth_token():
    return session.get('oauth_token')

@app.route('/logout')
def logout():
    session.pop('name', None)
    session.pop('id', None)
    session.pop('token', None)
    return redirect(url_for('index'))

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

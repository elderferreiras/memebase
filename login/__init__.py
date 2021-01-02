from flask import Blueprint, render_template


login_page = Blueprint(
    'login',
    __name__,
    template_folder='templates',
    static_folder='static',
    static_url_path='/login/static'
)


@login_page.route('/')
def login():
    return render_template('page.html')

import pytest
import app

from db import db
from flask import json

@pytest.fixture
def client():
    client = app.app.test_client()
    app.app.config['TESTING'] = True
    app.app.config['SQALCHEMY_TRACK_MODIFICATIONS'] = False 
    db.init_app(app.app)
    yield client

def test_get_contact_list(client):
    #http://localhost:500/contactlist
    rv = client.get('/contactlist')
    json = rv.get_json()
    assert("contact_info" in json)
    assert(rv.status_code == 200)
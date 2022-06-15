const 
    _userInfoKey = '_USER_INFO',
    _reqSignInKey = '_REQ_SIGN_IN',
    _respSignInKey = '_RESP_SIGN_IN';

const _siteChannel = new BroadcastChannel("_SITE_CHANNEL");

const saveUser = user => {
    sessionStorage.setItem(_userInfoKey, JSON.stringify(user));
}

const loadUser = () => {
    let userData = sessionStorage.getItem(_userInfoKey);
    if ((!userData) || (typeof userData === 'undefined'))
        return null;    
    var user = JSON.parse(userData);
    return user;
}

const isUserSignIn = () => (loadUser() !== null); 

const pushSignInRequest = () =>  _siteChannel.postMessage({ 'action': _reqSignInKey });

const receiveSiteMessage = e => {
    let data = e.data;
    switch (data.action) {
        case _reqSignInKey:
            let userInfo = loadUser();
            if (userInfo !== null) {
                _siteChannel.postMessage({ action: _respSignInKey, data: userInfo });
            }
            break;
        case _respSignInKey: 
            if (!isUserSignIn())
                saveUser(e.data.data);
            break;
    }
}
_siteChannel.onmessage = e => receiveSiteMessage(e);

window.setTimeout(() => {
    if (!isUserSignIn()) {
        console.log("post sign-in request message");
        pushSignInRequest();
    }
}, 500);
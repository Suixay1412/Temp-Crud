const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const userInit = (dbase, privateKey, createPassword) => {
    
  router.post('/login', (req, res) => {

    console.log('/login =>', req.body);

    const userName = req.body.userName;
    const password = req.body.password;

    dbase.readDocument({ 
      collection: 'User',
      query: JSON.stringify({ userName: userName, }),
    }, (err, resp) => {

      let user = { userName: '' }

      if (resp)  {
        let temp = JSON.parse(resp.data)
        if (temp.length)  user = temp[0]
      }
      else  {
        return res.json({
          text: 'Users database error!',
          token: null,
        })
      }
        
      if (user.userName == '')  {
        return res.json({
          text: 'Username not found!',
          token: null,
        })
      }

      console.log('User ->', userName, password, user);

      bcrypt.compare(password, user.password).then(isMatch => {

        if(isMatch) {

          const payload = {
            _id: user._id,
            userName: user.userName,
            userLevel: user.userLevel,
            userState: user.userState,
          }

          jwt.sign(payload, privateKey, {

            expiresIn: 60*60*24*1

          }, (err, token) => {
            (async () => {  

              if(err) {
                return res.json({
                  text: 'There is some error in token!',
                  token: null,
                })
              }
              else {

                let text = 'Login success!';
                if (user.userState == 'waiting')  text = 'Your account is not confirm!';
                return res.json({
                  text: text,
                  token: `Bearer ${token}`
                })  

              }
              
            })();   
          });
        }
        else {

          return res.json({
            text: 'Username or password incorrect!',
            token: null,
          })

        }                  
      }); 
    })

  });

  router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {  
    
    console.log('/me ->', req.user.text);
    
    if (!req.user.text)  {
      return res.json({
        _id: req.user._id,
        displayName: req.user.userLevel,
        userName: req.user.userName,
        email: req.user.email,
        text: '',
      });
    }
    else  {
      return res.json({
        text: 'Token error!',
      });
    }

  });

  router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('/all users');

    dbase.readDocument({
      collection: 'User',
      query: JSON.stringify({}),
    }, (err, resp) => {
      console.log(err, resp);

      if (resp) return res.json(JSON.parse(resp.data));
      else return res.json([]);
    });
  });

  router.post('/create', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      console.log('/create user ->', req.body);
      const userData = req.body.data;
      if (userData.password) userData.password = await createPassword(userData.password);
      dbase.createDocument({
        collection: 'User',
        data: JSON.stringify(userData),
      }, (err, resp) => {
        console.log(err, resp);
        if (err) return res.status(500).json({ error: 'Database error', details: err });
        if (resp) return res.json(JSON.parse(resp.data));
        else return res.status(500).json({ error: 'Unknown error' });
      });
    } catch (e) {
      console.error('Create user error:', e);
      return res.status(500).json({ error: 'Server error', details: e.message });
    }
  });

  router.post('/update', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      console.log('/update user ->', req.body);
      const userData = req.body.data;
      if (userData.password) userData.password = await createPassword(userData.password);
      dbase.updateDocument({
        collection: 'User',
        query: JSON.stringify({ _id: userData._id }),
        data: JSON.stringify(userData),
      }, (err, resp) => {
        console.log(err, resp);
        if (err) return res.status(500).json({ error: 'Database error', details: err });
        if (resp) return res.json(JSON.parse(resp.data));
        else return res.status(500).json({ error: 'Unknown error' });
      });
    } catch (e) {
      console.error('Update user error:', e);
      return res.status(500).json({ error: 'Server error', details: e.message });
    }
  });

  router.post('/delete', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      console.log('/delete user ->', req.body);
      dbase.deleteDocument({
        collection: 'User',
        query: JSON.stringify({ _id: req.body._id }),
      }, (err, resp) => {
        console.log(err, resp);
        if (err) return res.status(500).json({ error: 'Database error', details: err });
        if (resp) return res.json(JSON.parse(resp.data));
        else return res.status(500).json({ error: 'Unknown error' });
      });
    } catch (e) {
      console.error('Delete user error:', e);
      return res.status(500).json({ error: 'Server error', details: e.message });
    }
  });

}

module.exports = {
  userInit: userInit,
  router: router,
}

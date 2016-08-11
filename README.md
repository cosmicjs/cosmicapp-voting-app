Voting App
=====================
This is an example voting app that uses [React](https://facebook.github.io/react) for UI, [MobX](https://mobxjs.github.io/mobx) for state management, [Cosmic JS](https://cosmicjs.com) for the [CMS API](https://cosmicjs.com) and [Shorti](https://www.npmjs.com/package/shorti) for easy inline styles.  View the [demo here](http://voting-app.cosmicapp.co/).

###Getting started
```
git clone https://github.com/cosmicjs/cosmicapp-voting-app
cd cosmicapp-voting-app
npm install
```
#####Run in development with hot reloading

```
npm run development
open http://localhost:3000
```
#####Run in production connected to default bucket
```
npm start
open http://localhost:3000
```
###Create Your Own Poll
It's easy to create your own polls.  All you have to do is:<br>
1. Create a bucket on Cosmic JS.<br>
2. Import the `bucket.json` file into your empty bucket.<br>
3. Find your bucket slug in your bucket settings
#####Run in production connected to your bucket
```
COSMIC_BUCKET=your-bucket-slug npm start
open http://localhost:3000
```
###CMS API
By default the posts are connected to the Cosmic JS bucket `voting-app`.  [Sign up for Cosmic JS](https://cosmicjs.com) to add your own bucket, and edit the `config.js` file to point to your bucket.

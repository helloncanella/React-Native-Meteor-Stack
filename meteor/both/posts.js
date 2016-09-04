Posts = new Mongo.Collection('posts');

Meteor.methods({  
  'addPost': function() {
    console.log('oi')
    Posts.insert({title: 'Post ' + Random.id()});
  },

  'deletePost': function() {
    let post = Posts.findOne();
    if (post) {
      Posts.remove({_id: post._id});
    }
  }
})
var InfiniteScrollView  = require('famous-infinitescroll/InfiniteScrollView');

this.viewList = [];

this.scrollview = new InfiniteScrollView({
   margin: 1000,
   offset: 1000
});

this.viewSequence = new ViewSequence(this.viewList);
this.scrollview.sequenceFrom(this.viewSequence);

this.setOffset(this.scrollview.getSize()[1]);

this.scrollview.on('infiniteScroll', function(data) {
   this.scrollview.infiniteScrollDisabled = true;

   console.log('infiniteScroll');

   setTimeout(function () {
       this.scrollview.infiniteScrollDisabled = false;
   }.bind(this), 1000);
}.bind(this));

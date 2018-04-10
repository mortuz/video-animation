HTMLElement.prototype.requestFullscreen = HTMLElement.prototype.requestFullscreen || HTMLElement.prototype.webkitRequestFullscreen;
HTMLDocument.prototype.exitFullscreen = HTMLDocument.prototype.exitFullscreen || HTMLDocument.prototype.webkitExitFullscreen;

if (!('fullscreenElement' in document)) {
  Object.defineProperty(document, 'fullscreenElement', {
    get: function() {
      return document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement;
    }
  });
}

for (var prefixedFullscreenChangeEvent of ['webkitfullscreenchange']) {
  document.addEventListener(prefixedFullscreenChangeEvent, function(event) {
    event.stopPropagation();
    event.stopImmediatePropagation();


    var fullscreenChange = document.createEvent('Event');
    fullscreenChange.initEvent('fullscreenchange', true /*bubbles */, false /* cancelable */);
    event.target.dispatchEvent(fullscreenChange);

    //   toggle class vjs-fullscreen
    // full screen issue fix
    var videoElem=document.getElementById('js--video-player');
    if(document.fullscreenElement)
      videoElem.classList.add('vjs-fullscreen');
    else
      videoElem.classList.remove('vjs-fullscreen');
  });
}
window.HELP_IMPROVE_VIDEOJS = false;

function VideoPlayer () {
  var videoElem = document.createElement ('VIDEO');
  videoElem.setAttribute (
    'src',
    'Blank.mp4'
  );
  videoElem.setAttribute ('class', 'video-js vjs-fluid');
  videoElem.setAttribute ('controls', true);
  videoElem.setAttribute('autoplay', true)
  videoElem.setAttribute ('id', 'js--video-player');
  this.video = videoElem;
  console.log (videoElem);
}

VideoPlayer.prototype.animationStart = (function (el) {
  var animations = {
    animation: 'animationstart',
    OAnimation: 'oAnimationStart',
    MozAnimation: 'mozAnimationStart',
    WebkitAnimation: 'webkitAnimationStart',
  };

  for (var t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
}) (document.createElement ('div'));

VideoPlayer.prototype.animationEnd = (function (el) {
  var animations = {
    animation: 'animationend',
    OAnimation: 'oAnimationEnd',
    MozAnimation: 'mozAnimationEnd',
    WebkitAnimation: 'webkitAnimationEnd',
  };

  for (var t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
}) (document.createElement ('div'));

VideoPlayer.prototype.fetchData = function (uri, callback) {
  var self = this;
  fetch (uri)
    .then (function (response) {
      return response.json ();
    })
    .then (function (myJson) {
      self.data = myJson;
      callback ();
    });
};

VideoPlayer.prototype.init = function () {
  var self = this;
  var video = self.video;
  this.fetchData ('data.json', function callback () {
    $ ('.js-name').text (self.data.name);
    $ ('.js-recent_pmt_date .calendar__month').text (
      self.data.recent_pmt_date.month
    );
    $ ('.js-recent_pmt_date .calendar__data .num').text (
      self.data.recent_pmt_date.date
    );
    $ ('.js-recent_pmt_date .calendar__data .year').text (
      self.data.recent_pmt_date.year
    );
    $ ('.js-due_date .calendar__month').text (self.data.due_date.month);
    $ ('.js-due_date .calendar__data .num').text (self.data.due_date.date);
    $ ('.js-due_date .calendar__data .year').text (self.data.due_date.year);
    self.divideWordIntoLetters (self.data.month);
    CHARLIE.setup (video);
    return;
  });

  $ ('.charlie').on (self.animationStart, function (el) {
    if (this.id === 'amount') {
      self.numberAnimation (self.data.total_charges, 0, 50, this);
    } else if (this.id === 'textAnimate4amount') {
      self.numberAnimation (self.data.recent_pmt_amt, 0, 50, this);
    } else if (this.id === 'textAnimate5amount') {
      self.numberAnimation (self.data.overall_balance, 0, 50, this);
    } else if (this.id === 'textAnimate6amount') {
      self.numberAnimation (self.data.min_payment, 0, 50, this);
    } else if (this.id === 'textAnimate7__amount1') {
      self.numberAnimation (self.data.points_earned_month, 0, 50, this);
    } else if (this.id === 'textAnimate7__amount2') {
      self.numberAnimation (self.data.total_points_earned, 0, 50, this);
    }
  });
  
  //fullWindowOnEscKey(event);
  $('#videoPlayerWrapper').append(video);
  // videoPlayerWrapper.append (video);
  self.myPlayer = videojs ('js--video-player', {
    controls: true,
    autoplay: false,
    preload: false,
  });

  self.myPlayer.el_.addEventListener (
    'webkitfullscreenchange',
    function() {
      self.handleFullScreen.call(this, event)
    }
  );
  
  var currentTime = 0;

  //This example allows users to seek backwards but not forwards.
  //To disable all seeking replace the if statements from the next
  //two functions with myPlayer.currentTime(currentTime);

  self.myPlayer.on ('seeking', function (event) {
    if (currentTime < self.myPlayer.currentTime ()) {
      self.myPlayer.currentTime (currentTime);
    }
  });

  self.myPlayer.on ('seeked', function (event) {
    if (currentTime < self.myPlayer.currentTime ()) {
      self.myPlayer.currentTime (currentTime);
    }
  });
};
var vPlayer = new VideoPlayer (),
  video = vPlayer.video,
  textAnimationBlock = document.getElementById ('textAnimationBlock');

VideoPlayer.prototype.handleFullScreen = function (event) {
  var self = this;
  console.log ('handleFullScreen', event);
  /* Fullscreen */
  lockScreenInLandscape ();
 

  function requestFullscreenVideo () {
    if (videoPlayerWrapper.requestFullscreen) {
      videoPlayerWrapper.requestFullscreen ();
    } else {
      video.webkitEnterFullscreen ();
    }
  }

  if ('orientation' in screen) {
    screen.orientation.addEventListener ('change', function () {
      // Let's automatically request fullscreen if user switches device in landscape mode.
      if (screen.orientation.type.startsWith ('landscape')) {
        // Note: It may silently fail in browsers that don't allow requesting
        // fullscreen from the orientation change event.
        // https://github.com/whatwg/fullscreen/commit/e5e96a9da944babf0e246980559cd80a46a300ca
        requestFullscreenVideo ();
      } else if (document.fullscreenElement) {
        document.exitFullscreen ();
      }
    });
  }

  function lockScreenInLandscape () {
    if (!('orientation' in screen)) {
      return;
    }

    // Let's force landscape mode only if device is in portrait mode and can be held in one hand.
    if (
      matchMedia ('(orientation: portrait) and (max-device-width: 768px)')
        .matches
    ) {
      screen.orientation.lock ('landscape').then (function () {
        // When screen is locked in landscape while user holds device in
        // portrait, let's use the Device Orientation API to unlock screen only
        // when it is appropriate to create a perfect and seamless experience.
        listenToDeviceOrientationChanges ();
      });
    }
  }

  function listenToDeviceOrientationChanges () {
    if (!('DeviceOrientationEvent' in window)) {
      return;
    }

    var previousDeviceOrientation, currentDeviceOrientation;
    window.addEventListener (
      'deviceorientation',
      function onDeviceOrientationChange (event) {
        // event.beta represents a front to back motion of the device and
        // event.gamma a left to right motion.
        if (Math.abs (event.gamma) > 10 || Math.abs (event.beta) < 10) {
          previousDeviceOrientation = currentDeviceOrientation;
          currentDeviceOrientation = 'landscape';
          return;
        }
        if (Math.abs (event.gamma) < 10 || Math.abs (event.beta) > 10) {
          previousDeviceOrientation = currentDeviceOrientation;
          // When device is rotated back to portrait, let's unlock screen orientation.
          if (previousDeviceOrientation == 'landscape') {
            screen.orientation.unlock ();
            window.removeEventListener (
              'deviceorientation',
              onDeviceOrientationChange
            );
          }
        }
      }
    );
  }
};
VideoPlayer.prototype.numberAnimation = function (
  amount,
  delay,
  duration,
  parent
) {
  var options = {
    amount: amount,
    delay: delay,
    duration: duration,
  };
  var amount = options.amount;
  var time = amount / options.duration;
  var number = 0;
  var fixed = 0;
  if (amount.toString ().split ('.')[1]) {
    fixed = amount.toString ().split ('.')[1].length;
  }
  requestAnimationFrame (function interval () {
    number += time;
    parent.querySelector ('.number').innerHTML =
      // Math.round(number * 100) / 100;
      number.toFixed (fixed);
    if (number >= amount) {
      document.querySelector ('.number').innerHTML = amount;
      cancelAnimationFrame (interval);
    } else {
      requestAnimationFrame (interval);
    }
  });
};

VideoPlayer.prototype.divideWordIntoLetters = function (month) {
  var word = month;
  var str = word.split ('');
  $.each (str, function (index) {
    // идем по массиву
    $ ('#textAnimate2').append (
      '<span class="charlie" data-animations="textAnimateLetter" data-times="3.' +
        index +
        '">' +
        (this == ' ' ? '&nbsp;' : this) +
        '</span>'
    );
  });
};

$ (document).ready (function () {
  vPlayer.init ();

  var videoParent =video.parentElement;
  $(videoParent).insertBefore (textAnimationBlock, video);

  // divideWordIntoLetters ();
  textAnimationBlock.classList.add ('is-ready');
});

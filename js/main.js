$(document).ready(function () {
  // Here I'll save active track
  var audio;

  // Hide pause button
  $('#pause').hide();

  // Initialisating first audio
  initAudio($('#playlist li:first-child'))

  // Initialisazer function
  function initAudio(element) {
    var song = element.attr('song');
    var title = element.text();
    var cover = element.attr('cover');
    var artist = element.attr('artist');

    // Creating audio object
    // It has now its own methods
    // Like play
    audio = new Audio('media/' + song);

    // If song does not started yet
    if (!audio.currentTime) {
      $('#duration').html('0.00');
    }

    // Making title great
    $('#audio-player .title').text(title);
    $('#audio-player .artist').text(artist);

    // Insert cover image
    $('img.cover').attr('src', 'img/covers/' + cover);

    // Show audio that is active
    // in playlist
    $('#playlist li').removeAttr('class');
    element.addClass('active');
  }

  // Play button
  $('#play').click(function(){
    audio.volume = getVolume();
    audio.play();
    $('#play').hide();
    $('#pause').show();
    showDuration();
  });

  // Pause button
  $('#pause').click(function(){
    audio.pause();
    $('#pause').hide();
    $('#play').show();
  });

  // Stop button
  $('#stop').click(function(){
    audio.pause();
    audio.currentTime = 0;
    $('#pause').hide();
    $('#play').show();
  });

  // Next button
  $('#next').click(function(){
    audio.pause();
    var next = $('#playlist li.active').next();
    if (next.length == 0) {
      next = $('#playlist li:first-child');
    }
    initAudio(next);
    $('#play').hide();
    $('#pause').show();
    audio.volume = getVolume();
    audio.play();
    showDuration();
  });

  // Prev button
  $('#prev').click(function(){
    audio.pause();
    var prev = $('#playlist li.active').prev();
    if (prev.length == 0) {
      prev = $('#playlist li:last-child');
    }
    initAudio(prev);
    $('#play').hide();
    $('#pause').show();
    audio.volume = getVolume();
    audio.play();
    showDuration();
  });

  // Volume control
  $('#volume').change(function () {
    audio.volume = parseFloat(this.value / 10);
  });

  // Volume geting
  function getVolume () {
    var number = parseInt(document.getElementById('volume').value);
    return parseFloat(number/10);
  }

  // Great functionality to manipulate
  // current track second
  $('#progressbar').click(function(e) {
    var offset = $(this).offset();
    var position = e.pageX - offset.left;
    var value = audio.currentTime = Math.floor((audio.duration/264) * position);
    if (value == -1) {
      value++;
    }
    audio.currentTime = value;
    if ($('#pause').is(":visible")){
      audio.play();
    }
    showDuration();
  });

  // Activating track directly from playlist
  $('#playlist li').on('click', function () {
    var chosen = $(this);
    if (!$(this).hasClass('active')){
      audio.pause();
      initAudio(chosen);
      audio.volume = getVolume();
      audio.play();
      $('#play').hide();
      $('#pause').show();
      showDuration();
    }
  });

  //After song ends play next song

  // Time duration
  function showDuration () {
    // The .bind means when audio
    // has timeupdate change function
    // will called
    $(audio).bind('timeupdate', function () {
      // Get minutes & seconds
      var s = parseInt(audio.currentTime % 60);
      var m = parseInt((audio.currentTime / 60) % 60);
      // Add 0 if less then 10
      if (s < 10) {
        s = '0' + s;
      }
      $('#duration').html(m + '.' + s);

      // Code below activates progresbar lines
      var value = 0;
      if (audio.currentTime > 0) {
        value = Math.floor((264/audio.duration) * audio.currentTime);
      }
      $('#progress').css('width', value + 'px');

      // I guess code below does not should
      // be on its actual place, but unlike
      // .bind and .
      if( audio.currentTime >= audio.duration) {
        $('#next').trigger('click');
      }
    });
  }
});

// TODO

// Fix the bug when NEXT or PREV
// Button Play is active, but there
// Should be Pause button
/* DONE */

// Add functionality, when user clicks on
// progress bar the songs starts from that
// place
/* DONE */

// Sound icon change
/* DONE */

// Fix volume bug
/* DONE */

// Add functionality, when user clicks
// on track in playlist it turns on, but
// if user already listen it pass
/* DONE */

// Fix progress bar length bug
/* DONE */

// Auto next track after previous finishes
/* DONE */

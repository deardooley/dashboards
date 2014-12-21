// Custom chart data goes here.


/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var isLoadingHolder = false;
var currTabIndex;
if(typeof(Storage)!=="undefined") {
  currTabIndex = localStorage.getItem('Agave.dashboard.current_tab');
}

$(function () {

  // $('a[data-toggle="tab"]').tabs( {
  //   active: currTabIndex
  // });

	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {

		Holder.run({
			domain: $(this).attr('href').substring(1) + '.info'
		});

    if(typeof(Storage)!=="undefined") {
      localStorage.setItem('Agave.dashboard.current_tab', $(this).attr('href'));
    }
	});

  if (currTabIndex) {
    $('a[href="'+currTabIndex+'"]').click();
  }

  /**
   * To enable closing popover by clicking outside of box, the popover element
   *  must be a link. That causes issues at times, so we disable the click
   *  propagation so the popover fires cleanly.
   */
	$('a[data-toggle="popover"]').click(function (e) {
		e.preventDefault();
	});

  /**
   * Definition for the custom popover info boxes on each graph panel
   */
  $('[data-toggle="popover"]').popover({
		container: 'body',
		placement: 'left',
		trigger: 'focus'
	});

  /**
   * The status api does not give anything but up, down, maintenance, and deploying,
   * so we resolve those terms into something more entertaining for the user.
   */
  var statuses = [
		{
			icon: 'fa-thumbs-o-up',
			status: 'up',
			values: ['Up', 'Bueno', 'Good', 'Rockin', 'Cruising', 'Awesome', 'Super', 'Excellent', 'Joyful', 'Fierce']
		},
		{
			icon: 'fa-thumbs-o-down',
			status: 'down',
			values: ['Down', 'Borked', 'Struggling', 'Help', 'On strike', 'Asleep', 'Mid-life crisis', 'Bitter', 'Angstful', 'Sad', 'Angry']
		},
    {
      icon: 'fa-gamepad',
      status: 'maintenance',
      values: ['In surgery', 'Maintenance', 'Taking a breather', 'Recharging', 'Tune-up', 'Oil change', "Back in a few", 'Vacation', 'On break', 'Pensive', 'Tired']
    },
    {
			icon: 'fa-spin fa-spinner',
			status: 'deploying',
			values: ['Growing', 'Moving', 'Bulking up', 'Growth spurt', 'Cowboy up', 'Eating Wheaties', 'Power nap', 'Power up', 'Manning up']
		}
  ];
	var status = statuses[getRandomInt(0, statuses.length - 1)];
	var status_text = status.values[getRandomInt(0, status.values.length - 1)];
	$('#summary-status').html(status_text);
	$('#summary-status-icon').addClass(status.icon);

  /**
  * The CI api does not give anything but up, down, and building,
  * so we resolve those terms into something more entertaining for the user.
  */
  var buildStatuses = [
    statuses[0],
    statuses[1],
    {
      icon: 'fa-spin fa-spinner',
      status: 'building',
      values: ['Building']
    }
  ];

	status = buildStatuses[getRandomInt(0, buildStatuses.length - 1)];
	status_text = status.values[getRandomInt(0, status.values.length - 1)];
	$('#git-buildstatus').html(status_text);
	$('#git-buildstatus-icon').addClass(status.icon);


});

const COST_PER_HOUR = 13480392;

$(document).ready(function() {

    var template = _.template($('#banner-template').html());

    var startDate = +new Date('2025-10-01T00:01:00-04:00');

    var SECONDS = 1000,
        MINUTES = SECONDS * 60,
        HOURS = MINUTES * 60,
        DAYS = HOURS * 24;

    var _s = _.string;

    var addCommas = function(str) {
        var tmp = _s.reverse(str);
        tmp = tmp.replace(/([0-9]{3})/g, '$1,');
        var val = _s.reverse(tmp);
        if (val.substr(0, 1) === ',') {
            val = val.substring(1, val.length);
        }   
        return val;
    };

    function numberFormat(n) {
        var str = Math.round(n) + '';
        return '$' + addCommas(str);
    }


    function updateValues() {
        var currentDate = Math.abs(new Date()),
            timeDiff = currentDate - startDate;
        var days = Math.floor(timeDiff / DAYS),
            hours = Math.floor((timeDiff % DAYS) / HOURS),
            minutes = Math.floor((timeDiff % HOURS) / MINUTES),
            seconds = Math.floor((timeDiff % MINUTES) / SECONDS);
        var cost = timeDiff / HOURS * 12500000;
        var vals = {days: days,
                    hours: hours,
                    minutes: minutes,
                    seconds: seconds,
                    cost: numberFormat(cost),

                    // Pluralizations
                    days_pluralize: days === 1 ? '' : 's',
                    hours_pluralize: hours === 1 ? '' : 's',
                    minutes_pluralize: minutes === 1 ? '' : 's',
                    seconds_pluralize: seconds === 1 ? '' : 's'
                   };
        $('#template-wrapper').html(template(vals));
    }

    updateValues();
    window.setInterval(updateValues, 40)

});

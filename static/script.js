$('.calendar').append(Calendar.generate({
    start: {
        month: 11,
        year: 2011
    },
    end: {
        month: 10,
        year: 2012
    },
    classes: 'cf',
    type: 'list',
    labels: true
}));

var O = {};

O.calendarSlider = function() {
    var cont = $('#calendar'),
        calendar = cont.find('.calendar'),
        control = cont.find('.controls'),
        slider = control.find('.slider');
        
    var c_height = calendar.height() + cont.height() + slider.height(),
        s_height = control.height(),
        max = s_height - slider.height(),
        q = (c_height / s_height),
        offset = control.offset().top;
        
    var checkPosition = function(pos) {
        return Math.min(Math.max(pos, 0), max)
    };
        
    slider.draggable({
        addClasses: false,
        axis: 'y',
        containment: 'parent'
    });
    
    slider.bind('drag', function (e, ui) {
        calendar.css({top: -slider[0].offsetTop * q});
    });
    
    control.bind('click', function(e) {
        var m = checkPosition(e.pageY - offset);
        slider.animate({top: m}, {duration: 200, queue: false});
        calendar.animate({top: -m * q}, {duration: 200, queue: false});
    });
    
    cont.bind('mousewheel', function(e, d) {
        var m = checkPosition((d > 0) ? (slider[0].offsetTop - 5) : (slider[0].offsetTop + 5));
        slider.css({top: m}).trigger('drag')
    });
};


O.calendarSlider();
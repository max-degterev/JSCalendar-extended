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
        
    slider.draggable({
        addClasses: false,
        axis: 'y',
        containment: 'parent'
    });
    
    slider.bind('drag', function (e, ui) {
        calendar.css({top: -ui.position.top * q});
    });
    
    control.bind('click', function(e) {
        var m = Math.min(Math.max(e.pageY - offset, 0), max);
        slider.animate({top: m}, {duration: 200, queue: false});
        calendar.animate({top: -m * q}, {duration: 200, queue: false});
    });
};


O.calendarSlider();
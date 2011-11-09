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
    var cal = $('#calendar')
        control = cal.find('.controls'),
        slider = control.find('.slider');
        
    slider.draggable({
        addClasses: false,
        axis: 'y',
        containment: 'parent'
    });
};


O.calendarSlider();
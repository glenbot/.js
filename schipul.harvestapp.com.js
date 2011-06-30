var jquery18css = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/themes/base/jquery-ui.css';

$('head').append('<link rel="stylesheet" href="' + jquery18css + '" type="text/css" />');
$('#add_day_entry_link').live('click', function() {
    var project_selector_wrap = $('#project_tasks_selector_cont');
    var project_selector = project_selector_wrap.find('#project_selector');
    var project_tasks = [];
    var project_tasks_lookup = {};

    var sub_task_lookup = "timesheet.show_tasks_for_project(this.getAttribute('data-id'), '');";
    var new_project_selector = '<input type="text" data-id="0" id="project_selector" name="project" value="" onblur="' + sub_task_lookup + '" />';

    project_selector.find('optgroup').each(function() {
       var label = $(this).attr('label');
       $(this).find('option').each(function(){
          var option = $(this);
          var sub_label = option.html();
          var key = label + ' ' + sub_label;
          project_tasks.push(key);
          project_tasks_lookup[key] = option.val();
       });
    });

    project_selector.hide();
    project_selector_wrap.prepend(new_project_selector);
    project_selector = project_selector_wrap.find('#project_selector');
    project_selector.autocomplete({
        delay: 100,
        source: project_tasks,
        select: function(event, ui) {
            var key = ui.item.value;
            project_selector.attr('data-id', project_tasks_lookup[key]);
            project_selector.trigger('blur');
        }
    });
});

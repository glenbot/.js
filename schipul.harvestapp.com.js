/*
Harvest Project Search for Timesheet Day View

Add optional searchable input field for all of your projects
on the timesheet say view.

Requires jQuery UI 1.8+ in the .js/default.js file
*/

var jquery18css = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/themes/base/jquery-ui.css';

$('head').append('<link rel="stylesheet" href="' + jquery18css + '" type="text/css" />');
$('#add_day_entry_link').live('click', function() {
    var project_selector_wrap = $('#project_tasks_selector_cont');
    var project_selector = project_selector_wrap.find('#project_selector');
    var project_label = project_selector_wrap.parent().find('label');
    var project_tasks = [];
    var project_tasks_lookup = {};
    var project_tasks_lookup_reversed = {};
    var html = '';

    // setup the new elements
    html = '<input id="project-search" style="display:none;" type="text" data-id="0" name="project-search" value="" />';
    var project_search = $(html);

    html = '<a id="project-search-tl" style="padding-left: 5px;" href="#" alt="Search for project" title="Search for project">Search</a>';
    var search_toggle_link = $(html);

    html = '<a id="project-search-cl" style="display: none; padding-left: 5px;" href="#" alt="Cancel search for project" title="Cancel search for project">Cancel</a>';
    var search_cancel_link = $(html);   

    // create a list and dictionary lookup for autocomplete
    project_selector.find('optgroup').each(function() {
       var label = $(this).attr('label');
       $(this).find('option').each(function(){
          var option = $(this);
          var sub_label = option.html();
          var key = label + ' ' + sub_label;
          project_tasks.push(key);
          project_tasks_lookup[key] = option.val();
          project_tasks_lookup_reversed[option.val()] = key;
       });
    });

    // append the search link and search inputs
    if (project_selector_wrap.find('#project-search-tl').length == 0) {
      project_selector.css({'width': '80%'});
      project_selector.after(search_toggle_link);
      project_selector.after(search_cancel_link);
      project_selector_wrap.prepend(project_search);
    }

    // set the toggle link to bring up the search and hide the drop down
    $('#project-search-tl').live('click', function() {
      // hide selector and show search
      $(this).hide();
      project_selector.hide();
      project_search.css({'width': '80%'});
      project_search.show();
      project_search.focus();
      search_cancel_link.show();
      return false;
    });

    // set the toggle link to bring up the dropdown and hide the search
    $('#project-search-cl').live('click', function() {
      // hide selector and show search
      $(this).hide();
      project_selector.show();
      project_search.hide();
      search_cancel_link.hide();
      search_toggle_link.show();
      return false;
    });

    // set auto-complete on the new project search
    project_search.autocomplete({
        delay: 100,
        source: project_tasks,
        select: function(event, ui) {
            var key = ui.item.value;
            
            // hide the search and select the correct project dropdown
            project_selector.val(project_tasks_lookup[key]);
            project_selector.trigger('change');
            project_selector.show();
            project_search.hide();
            search_cancel_link.hide();
            search_toggle_link.show();
        }
    });

    // reset the label and search input on change
    project_selector.live('change', function() {
      var label = project_tasks_lookup_reversed[$(this).val()];
      project_label.html('Project / Task');
      project_label.html(project_label.html() + ' > ' + label);
      project_search.val(label);
    });
});

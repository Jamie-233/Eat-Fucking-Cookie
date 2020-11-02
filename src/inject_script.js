var foreground_entry_point = document.createElement('div');
var reactJS_script = document.createElement('script');

foreground_entry_point.id = 'foreground';
reactJS_script.src = 'foreground.bundle.js';

foreground_entry_point.appendChild(reactJS_script);

document.querySelector("body").appendChild(foreground_entry_point);

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['exercises'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "        <tr>\n            <input type=\"hidden\" class=\"exerciseId\" value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">\n            <input type=\"hidden\" class=\"exerciseName\" value=\""
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\">\n            <input type=\"hidden\" class=\"exerciseReps\" value=\""
    + alias2(alias1((depth0 != null ? depth0.reps : depth0), depth0))
    + "\">\n            <input type=\"hidden\" class=\"exerciseWeight\" value=\""
    + alias2(alias1((depth0 != null ? depth0.weight : depth0), depth0))
    + "\">\n            <input type=\"hidden\" class=\"exerciseDate\" value=\""
    + alias2(alias1((depth0 != null ? depth0.date : depth0), depth0))
    + "\">\n            <input type=\"hidden\" class=\"exerciseLbs\" value=\""
    + alias2(alias1((depth0 != null ? depth0.lbs : depth0), depth0))
    + "\">\n            <td>"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</td>\n            <td>"
    + alias2(alias1((depth0 != null ? depth0.reps : depth0), depth0))
    + "</td>\n            <td>"
    + alias2(alias1((depth0 != null ? depth0.weight : depth0), depth0))
    + "</td>\n            <td>"
    + alias2(alias1((depth0 != null ? depth0.date : depth0), depth0))
    + "</td>\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.lbs : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "            <td>\n                <input type=\"submit\" class=\"editExercise btn btn-primary\" value=\"Edit\">\n                <input type=\"submit\" class=\"deleteExercise btn btn-danger\" value=\"Delete\">\n            </td>\n        </tr>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "            <td>lbs</td>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "            <td>kg</td>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<table class=\"table\">\n    <thead>\n        <tr>\n            <th scope=\"col\">Name</th>\n            <th scope=\"col\">Reps</th>\n            <th scope=\"col\">Weight</th>\n            <th scope=\"col\">Date</th>\n            <th scope=\"col\">Unit</th>\n            <th scope=\"col\">Actions</th>\n        </tr>\n    </thead>\n    <tbody>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.results : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\n</table>";
},"useData":true});
})();
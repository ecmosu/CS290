function deepEqual(obj1, obj2) {
    //Attempt initial strict equality
    if (obj1 === obj2) {
        return true;
    }

    //Check equality of individual properties
    if (Object.keys(obj1).length === Object.keys(obj2).length) { //Check objects have same number of properties
        for (prop in obj1) { //Iterate properties
            if (obj2[prop] != null && typeof (obj1[prop]) == typeof (obj2[prop])) {
                if (typeof (obj1[prop]) == "object") {
                    return deepEqual(obj1[prop], obj2[prop]);
                }
                else {
                    return obj1[prop] === obj2[prop];
                }
            }
            else {
                return false;
            }
        }
    }
    else {
        return false;
    }
}

let obj = { here: { is: "an" }, object: 2 };
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, { here: 1, object: 2 }));
// → false
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }));
// → true
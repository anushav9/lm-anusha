export default function classy(...args) {
    let classname = '';

    args.forEach(arg => {
        if (arg) {
            if (classname.length) classname += ' ' + arg;
            else classname += arg;
        }
    });

    return classname;
}

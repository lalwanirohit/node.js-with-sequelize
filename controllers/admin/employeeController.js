const EventEmitter = require('events');

const Employee = require('../../models/employee');

exports.getAllEmployees = async(req,res,next) => {
    try {
        const employees = await Employee.findAll()
        res.render('admin/employees',{
            'title':'Employees',
            'employees':employees,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getAddEmployee = (req,res,next) => {
    res.render('admin/add-employee',{
        'title':'Add Employee',
        'heading':'Add Employee',
        'editMode':false,
        'action':'/admin/add-employee',
    });
};

exports.postAddEmployee = async(req,res,next) => {
    try{
        let name = req.body.name.trim();
        let email = req.body.email.trim();
        let designation = req.body.designation.trim();

        if(!name || !email || !designation){
            throw new Error("data is not available");
        }

        await Employee.create({
            name:name,
            email:email,
            designation:designation,
        })
        res.redirect('/admin');
    } catch(error){
        console.log(error);
    }
};

exports.getEditEmployee = async(req,res,next) => {
    try {
        const editMode = req.query.edit;
        if (!editMode) {
            return res.redirect('/admin');
        }
        const employeeId = req.params.employeeId;
        const employee = await Employee.findByPk(employeeId)
        if(!employee){
            return res.redirect('/admin');
        }
        res.render('admin/add-employee', {
            'title': 'Edit Employee',
            'heading':'Edit Employee',
            'editMode':editMode,
            'employee':employee,
            'action':'/admin/update-employee',
        });
    } catch(err) {
        console.log(err);
    }
};

exports.postEditEmployee = async(req,res,next) => {
    try {
        let employeeId = req.body.employeeId;
        let updatedName = req.body.name.trim();
        let updatedEmail = req.body.email.trim();
        let updatedDesignation = req.body.designation.trim();

        const employee = await Employee.findByPk(employeeId)

        employee.name = updatedName;
        employee.email = updatedEmail;
        employee.designation = updatedDesignation;

        await employee.save();

        console.log('Employee Updated');
        res.redirect('/admin');
    } catch (err) {
        console.log(err);
    }
};

exports.deleteEmployee = async(req,res,next) => {
    try {
        let employeeId = req.params.employeeId;

        await Employee.destroy({where:{id: employeeId}});
        console.log('Employee Deleted');
        res.redirect('/admin');
    } catch(err) {
        console.log(err);
    }
}

exports.eventAction = (req,res) => {
    var eventEmitter = new EventEmitter();

    eventEmitter.on('myEvent', (msg) => {
        console.log(msg);
        res.redirect('/admin')
    });

    eventEmitter.emit('myEvent', "First event");
}
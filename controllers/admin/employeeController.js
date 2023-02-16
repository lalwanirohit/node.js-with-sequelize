const Employee = require('../../models/employee');

exports.getAllEmployees = (req,res,next) => {
    Employee.findAll()
        .then(employees => {
            res.render('admin/employees',{
                'title':'Employees',
                'employees':employees,
            });
        })
        .catch(err => console.log(err));
};

exports.getAddEmployee = (req,res,next) => {
    res.render('admin/add-employee',{
        'title':'Add Employee',
        'heading':'Add Employee',
        'editMode':false,
        'action':'/admin/add-employee',
    });
};

exports.postAddEmployee = (req,res,next) => {
    try{
        let name = req.body.name.trim();
        let email = req.body.email.trim();
        let designation = req.body.designation.trim();

        console.log(name,email,designation);
        if(!name || !email || !designation){
            throw new Error("data is not available");
        }

        Employee.create({
            name:name,
            email:email,
            designation:designation,
        })
        .then(result => {
            res.redirect('/admin');
        })
        .catch(err => console.log(err));
    } catch(error){
        console.log(error);
    }
};

exports.getEditEmployee = (req,res,next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/admin');
    }
    const employeeId = req.params.employeeId;
    Employee.findByPk(employeeId)
        .then(employee => {
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
        })
        .catch(err => console.log(err));
};

exports.postEditEmployee = (req,res,next) => {
    let employeeId = req.body.employeeId;
    let updatedName = req.body.name.trim();
    let updatedEmail = req.body.email.trim();
    let updatedDesignation = req.body.designation.trim();

    Employee.findByPk(employeeId)
    .then(employee => {
        employee.name = updatedName;
        employee.email = updatedEmail;
        employee.designation = updatedDesignation;
        return employee.save();
    })
    .then(result =>{
        console.log('Employee Updated');
        res.redirect('/admin');
    })
    .catch(err => console.log(err));
};

exports.deleteEmployee = (req,res,next) => {
    let employeeId = req.params.employeeId;
    Employee.destroy({where:{id: employeeId}})
    .then(result => {
        console.log('Employee Deleted');
        res.redirect('/admin');
    })
    .catch(err => console.log(err));
}
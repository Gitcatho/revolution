use test

db.emp.count()

db.emp.find({sal:{$mod:[7,0]}}, {_id:0, eno:1, ename:1, sal:1})

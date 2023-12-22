const permission = {
    dashboard: {
        view: [],
    },
    users: {
        view: [],
        list: {
                view: [''],
                create:[],
                salaryCreate:[],
                details: {
                    view: ["all"],
                    edit: ["admin", "hr_manager"],
                    salary: {
                        view: [ ],
                        Detail:[ ],
                        edit:[ ],
                        }
                },
                history :{
                    view:[],
                },
                leave:{
                    view:[],
                    create:[],
                    detail:{
                        view:[],
                    },
                    edit:[],
                }

        },
    },
    project: {
        view:[],
        list:{
            view:[],
            create:[],
            detail:{
                view:[],
                edit:[],
                task:{
                    view:[],
                    create:[],
                    list:{
                        view:[],
                        detail:[],
                        edit:[],
                    }
                }
            }
        }
    },
    leaves: {
        view:[],
        create:[],
        detail:{
            view:[],
        },
        edit:[],
    }
}

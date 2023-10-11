const {RESTDataSource} = require ('apollo-datasource-rest')

class ProjectService extends RESTDataSource{

    constructor(){
        super();
        this.baseURL='http://localhost:3000';
    }


    getProjects(){
        return this.get('/projects')
        .then((projects)=>{
            return projects;
        })
        .catch((error) => console.log(error));
    }

    async findProjectById(id){
        const project = await this.get(`/projects/${id}`)
        return project;
    }
}

module.exports=ProjectService
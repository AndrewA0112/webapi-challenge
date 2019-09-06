express = require('express')
const projectDb = require('../data/helpers/projectModel')

const router = express.Router();

router.get('/:id', validateProjectId, (req, res) => {
    projectDb.get(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json({ message: 'Could not get the project'})
        })
})

router.post('/', validateProject, (req ,res) => {
    const projectInfo = req.body;
    projectDb.insert(projectInfo)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(error => {
            res.status(500).json({ message: 'Could not create project'})
        })
})

router.put('/:id', validateProject, validateProjectId, (req, res) => {
    projectDb.update(req.params.id, req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json({ message: 'Could not update project'})
        })
})

router.delete('/:id', validateProjectId, (req, res) => {
    projectDb.remove(req.params.id)
        .then(response => {
            res.status(200).json(req.project)
        })
        .catch(error => {
            res.status(500).json({ message: 'Could not delete project'})
        })
})

router.get('/:id/actions', validateProjectId, (req, res) => {
    projectDb.getProjectActions(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json({ message: 'Could not get project actions'})
        })
})


function validateProjectId(req, res, next) {
    const id = req.params.id
    projectDb.get(Number(id))
        .then(response => {
            if(response) {
                req.project = response
                next();
            }
            else {
                res.status(400).json({ message: 'Invalid project id'})
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Cannot fetch project data'})
        })
}

function validateProject(req, res, next) {
    if(!req.body.name || !req.body.description) {
        res.status(400).json({ message: 'Missing body name/description data'})
    }
    next();
};

module.exports = router;
module.exports = {
    apps: [
        {
            name   : "paritet-server-node",
            script : "node ~/public/backend/index.ts"
        },
        {
            name   : "project-frontend",
            script : "serve -n ~/public/frontend/"
        }
    ]
}
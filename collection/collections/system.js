const { client } = require("../uri");

const package_collection = client.db('system_collection').collection("packages");
const jobs_collection = client.db('jobs').collection("job_information");
const workspace_collection = client.db('organization').collection("workspace");
const category_collection = client.db('system_collection').collection("categories");
const job_type_collection = client.db('system_collection').collection("job_type");
const resource_category_collection = client.db('system_collection').collection("resource_categorys");
const search_history_collection = client.db('system_collection').collection("search_history");


module.exports = { package_collection, jobs_collection, workspace_collection, category_collection, job_type_collection, resource_category_collection, search_history_collection };

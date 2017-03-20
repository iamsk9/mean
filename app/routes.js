var jwt = require('jsonwebtoken');

var moment = require('moment');

var multer = require('multer');

var upload = multer({ dest: 'tmp/' });

/*
var AuthorizationMiddleware = require('./middlewares/authorizationMiddleware');

var IndexController = require('./controllers/indexController.js');

var DashboardController = require('./controllers/dashBoardController.js');
*/
var ClientController = require('./researcher/controllers/clientController.js');

module.exports = function(app, apiRoutes, blobService) {
  apiRoutes.post('/client', ClientController.addClient);
/*
	app.get('/', IndexController.handle);

	app.get('/document/:id', CustomRequestMiddleware.setresearcher, DocsController.downloadDocument);

	app.get('/client/resetpassword', researcherController.sendResetPassword);

  app.get('/clientform', ClientFormController.getClient);

	app.get('/researcher/resetpassword', researcherController.sendResetPassword);

	app.post('/resetPassword/:researcherId', researcherController.resetPassword);

	apiRoutes.post('/authenticate', researcherController.authenticate);

	apiRoutes.post('/forgotpassword', researcherController.forgotPassword);

	apiRoutes.post('/register', researcherController.register);

    apiRoutes.post('/clientform', ClientFormController.postClient);

    apiRoutes.get('/mastertasks', TaskController.getMasterTasks);

	apiRoutes.use(AuthorizationMiddleware.authorize);

	apiRoutes.get('/logout', researcherController.logout);

	apiRoutes.get('/dashboard', DashboardController.getDashboardData);

	apiRoutes.post('/client', ClientController.addClient);

	apiRoutes.get('/clients', ClientController.getClients);

	apiRoutes.get('/client/:id', ClientController.getClientDetails);

	apiRoutes.get('/clientEnquiry/:id', ClientController.getClientEnquiryDetails);

	apiRoutes.get('/reports', ReportsController.setReportsData);

	apiRoutes.patch('/client/:id', ClientController.updateClient);

	apiRoutes.post('/upload', DocsController.uploadDoc);

	apiRoutes.get('/zip/progress', DocsController.getZipProgress);

	apiRoutes.get('/client/:id/docs', DocsController.getDocuments);

	apiRoutes.patch('/document/:id', DocsController.updateDocument);

	apiRoutes.delete('/document/:id', DocsController.deleteDocument);

	apiRoutes.get('/docdownloads/:clientId', DocsController.getDocDownloads);

	apiRoutes.get('/researchers', researcherController.getresearchers);

	apiRoutes.post('/researcher', researcherController.addresearcher);

	apiRoutes.delete('/researcher/:researcherId', researcherController.removeresearcher);

	apiRoutes.patch('/researcher/:researcherId/enable', researcherController.enableresearcher);

	apiRoutes.patch('/researcher/:researcherId', researcherController.updateUser);

	apiRoutes.post('/createDirectory', DocsController.createDirectory);

	apiRoutes.get('/branches', BranchesController.getBranches);

	apiRoutes.post('/branches', BranchesController.createBranch);

	apiRoutes.get('/branches/:branchId', BranchesController.getBranch);

	apiRoutes.patch('/branches/:branchId', BranchesController.updateBranch);

	apiRoutes.delete('/branches/:branchId', BranchesController.removeBranch);

	apiRoutes.patch('/branch/:branchId/enable', BranchesController.enableBranch);

	apiRoutes.get('/works', DepartmentsController.getWorks);

	apiRoutes.post('/departments', DepartmentsController.createDepartment);

	apiRoutes.post('/departmentWorks', DepartmentsController.addDepartmentWorks);

    apiRoutes.patch('/departmentWorks/:id', DepartmentsController.updateDepartmentWorks);

    apiRoutes.get('/departments', DepartmentsController.getDepartments);

    apiRoutes.get('/departments/:id', DepartmentsController.getDepartmentTasks);

    apiRoutes.patch('/departments/:departmentId', DepartmentsController.updateDepartment);

    apiRoutes.delete('/departments/:departmentId/:removeWorksOnly', DepartmentsController.removeDepartment);

	apiRoutes.post('/task', TaskController.assignTask);

	apiRoutes.get('/tasks', TaskController.getTasks);

	apiRoutes.get('/task/:taskId', TaskController.getTask);

	apiRoutes.patch('/task/:taskId', TaskController.updateTask);

	apiRoutes.get('/task/:taskId/reqDocs', TaskController.getReqDocs);

	apiRoutes.get('/task/:Id/taskDocs', TaskController.getTaskDocs);

	apiRoutes.patch('/taskStatus', TaskController.updateTaskStatus);

	apiRoutes.delete('/task/:taskId', TaskController.removeTask);

	apiRoutes.get('/notifications', NotificationsController.getNotifications);

	apiRoutes.get('/notificationscount', NotificationsController.getNotificationsCount);

	apiRoutes.patch('/notifications/read', NotificationsController.markAllNotificationsAsRead);

	apiRoutes.patch('/notifications/read/:notificationId', NotificationsController.markNotificationAsRead);

	apiRoutes.patch('/client/:clientId/status', ClientController.updateClientStatus);

    apiRoutes.post('/clientTaskRejectStatus', ClientFormController.postTaskStatus);

	apiRoutes.delete('/works/:workId', DepartmentsController.removeWork);
*/
}

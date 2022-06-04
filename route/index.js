const renderMW = require('../middleware/renderMW');

const getJediMW = require('../middleware/jedi/getJediMW');
const getJediRecordMW = require('../middleware/jedi/getJediRecordMW');
const saveJediRecordMW = require('../middleware/jedi/saveJediRecordMW');
const deleteJediRecordMW = require('../middleware/jedi/deleteJediRecordMW');

const getCloneMW = require('../middleware/clone/getCloneMW');
const getCloneRecordMW = require('../middleware/clone/getCloneRecordMW');
const saveCloneRecordMW  = require('../middleware/clone/saveCloneRecordMW');
const deleteCloneRecordMW = require('../middleware/clone/deleteCloneRecordMW');

const JediModel = require('../models/jedi');
const CloneModel = require('../models/clone');

module.exports = function (app) {
	const objRepo = {
		JediModel: JediModel,
		CloneModel: CloneModel
	};
	
	//Jedi
	app.get('/', 
		getJediMW(objRepo), 
		renderMW(objRepo, 'index'));

	app.get('/jedi/edit',
		getJediMW(objRepo),
		renderMW(objRepo, 'jedi_edit'));

	app.use('/jedi/edit/:jedi_id',
		getJediRecordMW(objRepo),
		saveJediRecordMW(objRepo),
		renderMW(objRepo, 'jedi_edit_record'));

	app.use('/jedi/new',
		saveJediRecordMW(objRepo),
		renderMW(objRepo, 'jedi_edit_record'));

	app.get('/jedi/del/:jedi_id',
		getJediRecordMW(objRepo),
		deleteJediRecordMW(objRepo));
	
	//Clones
	app.get('/clone', 
		getCloneMW(objRepo),
		renderMW(objRepo, 'clone_view'));

	app.get('/clone/edit',
		getCloneMW(objRepo),
		renderMW(objRepo, 'clone_edit'));

	app.use('/clone/edit/:clone_id',
		getCloneRecordMW(objRepo),
		saveCloneRecordMW(objRepo),
		renderMW(objRepo, 'clone_edit_record'));

	app.use('/clone/new',
		saveCloneRecordMW(objRepo),
		renderMW(objRepo, 'clone_edit_record'));

	app.get('/clone/del/:clone_id',
		getCloneRecordMW(objRepo),
		deleteCloneRecordMW(objRepo));
};
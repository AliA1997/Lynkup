module.exports = {
    readGroups(req, res) {
        //Assign a variable that holds your database instance .
        const db = req.app.get('db');
        //Runs the sql file that reads the groups.
        db.read_all_groups().then(groups => {
            ///Return the groups to the frontend.
            res.status(200).json({groups});
        }).catch(err => console.log(err, 'Read All Groups Error------------'));
    },

    readGroup(req, res){
        const db = req.app.get('db');
        const { id } = req.params;

        db.read_group(id).then(group => {
            res.status(200).json({group: group[0]});
        }).catch(err => console.log(err, 'Read group error-------'))
    },
    
    readUserAdminGroups(req, res) {
        //Assign variable to database instance.
        const db = req.app.get('db');
        //Destruct the id from the request params.
        const { id } = req.params;
        //Read User Admin Groups---------
        db.read_user_admin_groups(id).then(groups => {
            //Return groups to the frontend.
            res.status(200).json({groups});
        }).catch(err => console.log(err, 'Read User Admin Groups Error------------'));
    },
    readUserGroups(req, res) {
        //Assign variable to database instance.
        const db = req.app.get('db');
        //Destruct the id from the request param.
        const { user } = req.params;
        console.log('req.session.user----------------', req.session.user);
        if(user) {
            const { name, username, email, profile_picture, age } = user;
            const userToLookFor = { name, username, email, profile_picture, age };
            console.log('req.session.user------------', userToLookFor);
            //Read User Groups  
            db.read_user_groups([userToLookFor]).then(groups => {
                console.log('groups--------------', groups);
                //Return groups to the frontend.
                res.status(200).json({groups});
            }).catch(err => console.log(err, 'Read User Groups Error-------------------'));
        }
    },
    readUsersDropdown(req, res) {
        //Assign variable to database instance.
        const db = req.app.get('db');
        //Destruct the id from the request param.
        // const { id } = req.params;
        //Read Users for dropdown
        db.read_users_dropdown().then(users => {
            //Return users to the frontend
            res.status(200).json({users});
        }).catch(err => console.log(err, 'Read Users Dropdown-------------------'));
    },
    createGroup(req,res) {
        //Assign a variable that holds your database instance.
        const db = req.app.get('db');
        //Destruct the id from teh req.session.user.
        const { id } = req.session.user;
        //Destruct the values that will be used to create a new group.
        const { groupName, groupDescription, groupImage, groupMembers, isPrivate } = req.body;
        //Assigning the new group the values we destructured.
        const newGroup = { group_name: groupName, group_description: groupDescription, group_image: groupImage, 
            group_members: groupMembers, group_admin: id, is_private: isPrivate };
        console.log('group admin-------', newGroup.group_admin);
        db.create_group(newGroup).then(groups => {
            //Return the group
            res.status(200).json({group: groups[0]});
        }).catch(err => console.log(err, 'Create Group Error-----------'));
    },
    updateGroup(req, res) {
        //Assign a variable that holds your database instance.
        const db = req.app.get('db');
        //Destruct the properties neeeded to created a updated group.
        const { id, admin_id,  group_name, group_description, group_members, group_image, is_private } = req.body;
        console.log('req.boyd--------------', req.body);
        //Assign a variable called updatedGroup the new group properties.
        const updatedGroup = { id, admin_id, group_name, group_description, group_members, group_image, is_private }
        db.update_group(updatedGroup).then(groups => {
            //REturn a 200 status code and the updated groups.
            res.status(200).json({groups});
        }).catch(err => console.log(err, 'Update Group Database Error--------------'));
    },
    deleteGroup(req, res) {
        //Assign variable call db that set to the database instance.
        const db = req.app.get('db');
        //Destruct the id to delete the group.
        const { id } = req.body;
        db.delete_group(id).then(groups => {
            //Return a 200 status code with the updated groups.
            res.status(200).json({groups});
        }).catch(err => console.log(err, "Delete Group Database error------------"));
    },
    addMember(req, res) {
        //Assign variable call db that set to the database instance 
        const db = req.app.get('db');
        //Destruct the currentAttendeeSelected from the req.body.
        const { currentAttendeeSelected } = req.body;
        db.add_member(currentAttendeeSelected).then(groups => {
            //Return a 200 status code, and the updated members.
            res.status(200).json({groups});
        }).catch(err => console.log(err, 'Add Member Database Error-----------'));
        
    },
    removeMember(req, res) {
        const db = req.app.get('db');
        //Destruct the currentAttendeeSelect from the req.body;
        const { currentAttendeeSelected } = req.body;
        db.remove_member(currentAttendeeSelected).then(groups => {
            //Return a 200 status code, and the updated members.
            res.status(200).json({groups});
        }).catch(err => console.log(err, 'Remove Member Database Error--------------'))
    }
}
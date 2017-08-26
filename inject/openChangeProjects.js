/**
 * Created by d048927 on 2017-08-17.
 */
alert('Table' + sap.ui.getCore().byId('__table0').getMetadata().getName());
table = sap.ui.getCore().byId("__table0");
console.log("Table found " + table);
console.log("Table found " + table.getMetadata().getName());

openProject = function(row) {
    firstRow = table.getRows()[row];
    linkCell = firstRow.getCells()[2];
    console.log("Link Cell found: " + linkCell.getMetadata().getName());
    link = linkCell.getLabelForControl();
    link.firePress();
};

openProject(0);
openProject(1);
openProject(2);

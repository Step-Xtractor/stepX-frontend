import axios from "axios";

export default function(){

    // useEffect(()=>{
    //   if(Volunteers.allVolunteers && Volunteers.allVolunteers.length > 0){
        axios
        .get("//cdn.datatables.net/plug-ins/1.10.21/i18n/Portuguese-Brasil.json")
        .then(response => {
          window.$('.datatables').DataTable({
            "bLengthChange" : false, //thought this line could hide the LengthMenu
            "bInfo":false,  
            paging: false ,
            "language": response.data,
            "searching": true,
            "dom": 't'
          });
        })
        .catch(function(error) {
            // manipulate the error response here
        });
        
    //   }
    // });
};
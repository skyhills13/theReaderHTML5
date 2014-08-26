polyJson 
{
        0 : "100", 
        1 : "300", 
        2: "200", 
        3 : "360", 
        4: "300", 
        5: "400"
}

===

radarJson
{
        0 : 
        {
                "type" : "소설",
                "read" : "130"
        },
        1 :
        {
                "type" : "시",
                "read" : "200"
        },
        2:
        {
                "type" : "사회 과학",
                "read" : 10
        },
        3:      
        {
                "type" : "자연 과학",
                "read" : 100        
        },
        4:
        {
                "type" : "역사",
                "read" : 5
        }
}


===
totalJson 
{
        140828 : 
                { 
                        "title" : "일반 물리학" , 
                        "read" : "100", 
                        "startPage" : "134",
                        "endPage" : "224", 
                        "total" : "1300", 
                        "type" : "소설", 
                        "completed" : 0 
                } ,
        140829 : 
                { 
                        "title" : "일반 물리학" , 
                        "read" : "190",
                        "startPage" : "225",
                        "endPage" : "325", 
                        "total" : "1300", 
                        "type" : "소설", 
                        "completed" : 0 
                } ,
        140901 : 
                { 
                        "title" : "인생 수업" , 
                        "read" : "0",
                        "startPage" : "225",
                        "endPage" : "325", 
                        "total" : "500", 
                        "type" : "소설", 
                        "completed" : 0 
                } , 
        140903 : 
                {
                         "title" : "파도가 바다의 일이라면" , 
                        "read" : "100",
                        "startPage" : "0",
                        "endPage" : "100", 
                        "total" : "100", 
                        "type" : "시", 
                        "completed" : 1 
                }                         
}

//totalJson의 경우, 하루에 여러권의 책을 읽을 경우가 빠져있음.
//이미 설계 한 거이 아까워 일단 써놓기는 하였으나, 사실상 의미없어 보임.

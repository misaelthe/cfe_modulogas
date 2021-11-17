<%@page import="javax.naming.Context"%>
<%@page import="com.pci.gtdw.util.ContextInterface"%>
<%@page import="com.pci.gtdw.util.LoadBean"%>
<%@page import="com.pci.gtdw.editor.ScriptLibraryRunRemoteEditor" %>
<%@page import="com.pci.gtdw.util.LogHelper" %>
<%@page import="java.util.Enumeration" %>
<%@page import="java.util.HashMap" %>
<%@page import="java.util.Map" %>
<%@page import="com.fasterxml.jackson.databind.ObjectMapper" %>
<%@page import="org.json.JSONObject" %>
<%@page import="java.io.IOException" %>

<%
LogHelper log = new LogHelper();
String obj ="init";

try {
   

         Enumeration<String> enumeration = request.getParameterNames();
         log.warn("Json=" + enumeration);
        
           Map<String, Object> modelRequestMap = new HashMap<>();
		  log.warn("modelRequestMap=" + modelRequestMap);
		  int x = 0;
           while (enumeration.hasMoreElements()) {
			   
			    log.warn("x="+ x++);
			String parameterName = enumeration.nextElement();
			modelRequestMap.put(parameterName, request.getParameter(parameterName));
           }
		   
		     ObjectMapper objMapper = new ObjectMapper();

 log.warn("Json=init");
      String jsonStr = objMapper.writeValueAsString(modelRequestMap);
 log.warn("Json=" + jsonStr);
        
       log.warn("Json="+x++);  
    Context ctx = ContextInterface.getContextInfo();
	 log.warn("Json="+x++);
	ScriptLibraryRunRemoteEditor rr = LoadBean.getEJB(ctx, ScriptLibraryRunRemoteEditor.class);
	 log.warn("Json=" +x++);
		
	Object[] params = new Object[1];
    params[0] = jsonStr;
 log.warn("Json=" + x++);
    obj = (String) rr.run("CST", "new com.cfe.process.automated.pantallasgraficas.ActionController()", "getData", params);

	   log.warn("Json=" +x++);	
      }
catch (Exception e) {
  log.error(e);
}     
          
        

 
%>
<%= obj%>
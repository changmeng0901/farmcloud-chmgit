<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Random"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.util.Arrays"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="org.apache.commons.fileupload.FileItem"%>
<%@ page import="org.apache.commons.fileupload.FileItemFactory"%>
<%@ page import="org.apache.commons.fileupload.servlet.ServletFileUpload"%>
<%@ page import="org.apache.commons.fileupload.disk.DiskFileItemFactory"%>
<%@ page import="net.sf.json.JSONObject"%>
<%@ page import="cn.acsm.admin.farmeasy.util.FileUploadUtil"%>
<%@ page import="cn.acsm.commons.util.AttachFactory"%>
<%

/**
 * KindEditor JSP
 * 
 * 本JSP程序是演示程序，建议不要直接在实际项目中使用。
 * 如果您确定直接使用本程序，使用之前请仔细确认相关安全设置。
 * 
 */

//文件保存目录路径
String savePath = "/var/www/feadoc/images/";

//文件保存目录URL
String saveUrl  = "/feadoc/images/";

//定义允许上传的文件扩展名
HashMap<String, String> extMap = new HashMap<String, String>();
extMap.put("image", "gif,jpg,jpeg,png,bmp");
extMap.put("flash", "swf,flv");
extMap.put("media", "swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb");
extMap.put("file", "doc,docx,xls,xlsx,ppt,htm,html,txt,zip,rar,gz,bz2");

//最大文件大小
long maxSize = 1000000;

response.setContentType("text/html; charset=UTF-8");

if(!ServletFileUpload.isMultipartContent(request)){
	out.println(getError("请选择文件。"));
	return;
}
//检查目录
java.io.File uploadDir = new java.io.File(savePath);
if(!uploadDir.isDirectory()){
	out.println(getError("上传目录不存在。"));
	return;
}
//检查目录写权限
if(!uploadDir.canWrite()){
	out.println(getError("上传目录没有写权限。"));
	return;
}

String dirName = request.getParameter("dir");
if (dirName == null) {
	dirName = "image";
}
if(!extMap.containsKey(dirName)){
	out.println(getError("目录名不正确。"));
	return;
}
//创建文件夹
savePath += dirName + "/";
saveUrl += dirName + "/";
java.io.File saveDirFile = new java.io.File(savePath);
if (!saveDirFile.exists()) {
	saveDirFile.mkdirs();
}
SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
String ymd = sdf.format(new Date());
savePath += ymd + "/";
saveUrl += ymd + "/";
java.io.File dirFile = new java.io.File(savePath);
if (!dirFile.exists()) {
	dirFile.mkdirs();
}

FileItemFactory factory = new DiskFileItemFactory();
ServletFileUpload upload = new ServletFileUpload(factory);
upload.setHeaderEncoding("UTF-8");
List items = upload.parseRequest(request);
Iterator itr = items.iterator();
String enterpriseId = request.getParameter("enterpriseId");
String directoryType = request.getParameter("directoryType");
String businessType = request.getParameter("businessType");
String dir = request.getParameter("dir");
System.out.println(enterpriseId+"=="+directoryType+"=="+businessType);
int attach_type = 1;
if("image".equals(dir)){
	attach_type = 1;
}else if("file".equals(dir) || "flash".equals(dir)){
	attach_type = 3;
}else if("media".equals(dir)){
	attach_type = 4;
}
while (itr.hasNext()) {
	FileItem item = (FileItem) itr.next();
	String fileName = item.getName();
	long fileSize = item.getSize();
	if (!item.isFormField()) {
		/* //检查文件大小
		if(item.getSize() > maxSize){
			out.println(getError("上传文件大小超过限制。"));
			return;
		}
		//检查扩展名
		String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
		if(!Arrays.<String>asList(extMap.get(dirName).split(",")).contains(fileExt)){
			out.println(getError("上传文件扩展名是不允许的扩展名。\n只允许" + extMap.get(dirName) + "格式。"));
			return;
		}

		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
		String newFileName = df.format(new Date()) + "_" + new Random().nextInt(1000) + "." + fileExt;
		try{
			java.io.File uploadedFile = new java.io.File(savePath, newFileName);
			item.write(uploadedFile);
		}catch(Exception e){
			out.println(getError("上传文件失败。"));
			return;
		}

		JSONObject obj = new JSONObject();
		obj.put("error", 0);
		obj.put("url", saveUrl + newFileName);
		out.println(obj.toString()); */
		
		JSONObject jsResult = null;
        if(enterpriseId != null && !"".equals(enterpriseId)){
        	jsResult = FileUploadUtil.getFilePath(fileName, item.get(), attach_type, Integer.parseInt(businessType),Integer.parseInt(directoryType),Integer.parseInt(enterpriseId));
        }else{
        	jsResult = FileUploadUtil.getFilePath(fileName, item.get(), attach_type, Integer.parseInt(businessType),Integer.parseInt(directoryType),null);
        }
        
        if(jsResult.getString("invoke_result").equals("INVOKE_SUCCESS")){
        	JSONObject jsurl = JSONObject.fromObject(jsResult.getString("url")); 
			String  fileUrl = jsurl.getString("fileUrl");
			
			JSONObject obj = new JSONObject();
			obj.put("error", 0);
			obj.put("url", fileUrl);
			out.println(obj.toString());
        }else{
        	out.println(getError("上传文件失败。"));
			return;
        }
	}
}
%>
<%!
private String getError(String message) {
	JSONObject obj = new JSONObject();
	obj.put("error", 1);
	obj.put("message", message);
	return obj.toString();
}
%>
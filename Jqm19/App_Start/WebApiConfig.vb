Imports System
Imports System.Collections.Generic
Imports System.Linq
Imports System.Web.Http

Public Class WebApiConfig
    Public Shared Sub Register(ByVal config As HttpConfiguration)

		config.Routes.MapHttpRoute( _
			name:="DefaultAcionApi2", _
			routeTemplate:="api/{controller}/{action}/{id}/{id2}"
		)

		config.Routes.MapHttpRoute( _
			name:="DefaultApi", _
			routeTemplate:="api/{controller}/{action}/{id}", _
			defaults:=New With {.id = RouteParameter.Optional} _
		)
	End Sub
End Class
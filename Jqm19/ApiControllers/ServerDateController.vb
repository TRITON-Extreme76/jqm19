Imports System.Net
Imports System.Web.Http

Public Class ServerDateController
	Inherits ApiController

	<HttpPost>
	Public Function Send(<FromBody> dt As ServerDate) As ServerDate



		Return dt
	End Function

End Class

<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="/umbraco/masterpages/umbracoPage.Master" CodeBehind="QuickWins.aspx.cs" Inherits="SEOChecker.Pages.Issues.QuickWins" %>

<%@ Register Assembly="controls" Namespace="umbraco.uicontrols" TagPrefix="umbraco" %>
<%@ Register Assembly="SEOChecker" Namespace="SEOChecker.Controls" TagPrefix="SEOChecker" %>
<%@ Import Namespace="SEOChecker.Resources" %>
<%@ Import Namespace="SEOChecker.Core.Repository.ContentIssues" %>
<asp:Content ID="header" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" type="text/css" href="../../css/SEOChecker.css" />
    <script type="text/javascript">
        function DeleteItem(id) {
            $('.ActionPanel' + id).fadeOut(250);
        }

        function OpenDeleteDialog(id) {
            UmbClientMgr.openModalWindow('plugins/SEOChecker/pages/dialogs/confirmdelete.aspx?type=validationerror&id=' + id, 'Delete', true, 400, 300);
        }
    </script>
</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="body" runat="server">
    <umbraco:UmbracoPanel ID="UmbracoPanel" runat="server">
    <SEOChecker:SEOCheckerPanel ID="SEOCheckerPanel" runat="server" />
       
        <asp:PlaceHolder ID="NoIssuesPlaceHolder" runat="server">
            <umbraco:Pane ID="noresultPane" runat="server">
                <h2 class="propertypaneTitel">
                    <%= ResourceHelper.Instance.GetStringResource("Overview_InboundLinks_NoResult")%></h2>
            </umbraco:Pane>
        </asp:PlaceHolder>
        <asp:PlaceHolder ID="OverviewPlaceHolder" runat="server">
            <asp:Repeater ID="OverviewRepeater" runat="server">
                <ItemTemplate>
                    <asp:Panel ID="NotFoundPanel" runat="server" CssClass='<%#string.Format("ActionPanel{0}",Eval("IssueId")) %>'>
                        <umbraco:Pane ID="NotFoundPane" runat="server">
                            <div class="propertyItem">
                                <div class="propertyItemheader">
                                    <%# SEOChecker.Helpers.TextHelper.WriteTextWithDescriptionforPropertyPanel(Eval("DocumentTitle").ToString(), Eval("ErrorDescription").ToString()) %>
                                 </div>
                                <div class="propertyItemContent">
                                    <asp:TextBox ID="testTexbox" runat="server"  Text='<%#Eval("Error") %>' CssClass="umbEditorTextField"/>
                                </div>
                                <div class="SEOCheckerOverviewButtons">
                               <SEOChecker:DeleteButton ID="DeleteButton" runat="server" IssueId='<%#Eval("IssueId") %>' />
                               </div>
                            </div>
                        </umbraco:Pane>
                    </asp:Panel>
                </ItemTemplate>
            </asp:Repeater>
        </asp:PlaceHolder>
    </umbraco:UmbracoPanel>
</asp:Content>

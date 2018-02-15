public class CardViewModel
{
    public int Id { get; set; }

    public string Suptitle { get; set; }

    public string Headline { get; set; }

    public string Subtitle { get; set; }

    public int ImageId { get; set; }

    public string Url { get; set; }
    public bool IsUrlExternal { get; set; }

    public string PrimaryButtonUrl { get; set; }
    public string PrimaryButtonText { get; set; }
    public bool IsPrimaryButtonUrlExternal { get; set; }

    public string SecondaryButtonUrl { get; set; }
    public string SecondaryButtonText { get; set; }
    public bool IsSecondaryButtonUrlExternal { get; set; }

    public bool IsSimpleCard { get; set; }


    public string ModifierClass { get; set; }
}
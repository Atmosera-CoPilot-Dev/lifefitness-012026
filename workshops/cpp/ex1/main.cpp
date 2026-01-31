#include <iostream>
#include <vector>

/*
 * IReportTemplate implements a template method defining the skeleton of an algorithm
 */
class IReportTemplate
{
private:
    void RenderTitle(std::string title)
    {
        std::cout << title << std::endl;
    }
    void RenderHeadings(std::vector<std::string> headings)
    {
        for (std::vector<std::string>::iterator it = headings.begin(); it < headings.end(); ++it)
        {
            std::cout << *it << '\t';
        }
        std::cout << std::endl;
    }
    void RenderRows(std::vector<std::vector<std::string>> rows)
    {
        for (auto &row : rows)
        {
            for (std::vector<std::string>::iterator it = row.begin(); it < row.end(); ++it)
            {
                std::cout << *it << '\t';
            }
            std::cout << std::endl;
        }
        std::cout << std::endl;
    }
    void RenderFooter(std::string title)
    {
        std::cout << title << std::endl;
    }

protected:
    virtual std::string GetTitle() = 0;
    virtual std::vector<std::string> GetHeadings() = 0;
    virtual std::vector<std::vector<std::string>> GetRows() = 0;
    virtual std::string GetFooter() = 0;

public:
    void templateMethod()
    {
        RenderTitle(GetTitle());

        RenderHeadings(GetHeadings());

        RenderRows(GetRows());

        RenderFooter(GetFooter());
    }

    virtual ~IReportTemplate() {}
};

/*
 * CompanyReport implements the primitive operations to carry out specific steps
 * of the algorithm, there may be many Concrete classes, each implementing
 * the full set of the required operation
 */
class CompanyReport : public IReportTemplate
{
protected:
    std::string GetTitle() override
    {
        return "Scoppa Software Solutions, LLC";
    }

    std::vector<std::string> GetHeadings() override
    {
        std::vector<std::string> headings;
        headings.push_back("SKU");
        headings.push_back("PRICE");
        return headings;
    }

    std::vector<std::vector<std::string>> GetRows() override
    {
        std::vector<std::vector<std::string>> rows;
        rows.push_back(std::vector<std::string>{"a01d", "$12.99"});
        rows.push_back(std::vector<std::string>{"a7cd", "$15.99"});
        rows.push_back(std::vector<std::string>{"a9cb", "$18.99"});
        return rows;
    }

    std::string GetFooter() override
    {
        return "All rights reserved";
    }

public:
    ~CompanyReport() {}
};

int main()
{
    IReportTemplate *tm = new CompanyReport;
    tm->templateMethod();

    delete tm;

    return 0;
}

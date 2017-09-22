Title prop gets truncated to 1st letter:

     <Accordion>
          <div title="first">this is the first panelasdasdasdas asdasd asda asda asd asd asdas dasda asdddd sad sd a asdadasd asd ad dsadasd asd asdasd ad asd </div>
          <div title="second">this is the second panel</div>
          <div title="third">this is the third panel</div>
     </Accordion>


Accordion with expand all

     <Accordion expandAll={true}>
          <div title="first">this is the first panel</div>
          <div title="second">this is the second panel</div>
          <div title="third">this is the third panel</div>
     </Accordion>

Accordion with multiOpen functionality

     <Accordion multiOpen={true}>
          <div title="first">this is the first panel</div>
          <div title="second">this is the second panel</div>
          <div title="third">this is the third panel</div>
     </Accordion>

Accordion with Width set in props

     <Accordion accordionWidth={400}>
          <div title="first">this is the first panel</div>
          <div title="second">this is the second panel</div>
          <div title="third">this is the third panel</div>
     </Accordion>

Accordion with defined open panel

     <Accordion>
          <div title="first">this is the first panel</div>
          <div title="second" expanded>this is the second panel</div>
          <div title="third">this is the third panel</div>
     </Accordion>

Accordion with disabled prop

     <Accordion disabled>
          <div title="first">this is the first panel</div>
          <div title="second">this is the second panel</div>
          <div title="third">this is the third panel</div>
     </Accordion>
import React from "react";
function classSet(classNames) {
  var names = "";

  if (typeof classNames == "object") {
    for (var name in classNames) {
      if (!classNames.hasOwnProperty(name) || !classNames[name]) {
        continue;
      }
      names += name + " ";
    }
  } else {
    for (var i = 0; i < arguments.length; i++) {
      // We should technically exclude 0 too, but for the sake of backward
      // compat we'll keep it (for now)
      if (arguments[i] == null) {
        continue;
      }
      names += arguments[i] + " ";
    }
  }

  return names.trim();
}

const DonutChart = (props) => {
  const handleClick = (e) => {
    e.nativeEvent.stopImmediatePropagation();
  };

  const renderPaths = () => {
    var total = parseFloat(props.total);
    var size = props.series.reduce((memo, item) => memo + item.data, 0);
    var startAngle = parseFloat(props.startAngle);
    var stickyAngle = parseFloat(props.stickyAngle);

    if (!isNaN(stickyAngle) && size !== total) {
      //alert(stickyAngle - (size / total * 360 / 2))
      startAngle = stickyAngle - ((size / total) * 360) / 2;
    }

    var series = props.series.map((item) => {
      var path = item.selected
        ? renderSelectedPath(item, total, startAngle)
        : renderPath(item, total, startAngle);

      startAngle += (item.data / total) * 360;

      return path;
    });

    if (isNaN(total)) {
      total = 100;
      series.push(renderEmptyPath({ data: total }, total, startAngle));
    } else if (size < total) {
      series.push(renderEmptyPath({ data: total - size }, total, startAngle));
    }

    return series;
  };

  const getTextEllipsis = (text, maxWidth) => {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var svgNS = svg.namespaceURI;
    var newText = document.createElementNS(svgNS, "text");
    var textNode = document.createTextNode("...");
    var ellipsisWidth, textWidth;

    if (!text) {
      return;
    }

    newText.appendChild(textNode);
    svg.appendChild(newText);
    document.body.appendChild(svg);
    ellipsisWidth = newText.getSubStringLength(0, "...".length);
    textNode.textContent = text;
    textWidth = newText.getSubStringLength(0, text.length);

    if (textWidth > maxWidth) {
      while (textWidth + ellipsisWidth > maxWidth) {
        text = text.slice(0, -1);
        textNode.textContent = text + "...";
        textWidth = newText.getSubStringLength(0, text.length);
      }
    }

    svg.remove();

    return textNode.textContent;
  };

  const renderText = () => {
    var series = props.series.filter((item) => item.selected);
    var selected = series.length ? series[0] : null;
    var label = selected ? selected.label : props.defaultLabel;
    var value = selected ? selected.value : props.defaultValue;

    return (
      <g>
        <text className="DonutChart-label" x="50%" y="45%" text-align="middle">
          <tspan textAnchor="middle">{getTextEllipsis(label, 125)}</tspan>
          <title>{label}</title>
        </text>
        <text className="DonutChart-value" x="50%" y="60%" text-align="middle">
          <tspan textAnchor="middle">{value}</tspan>
          <title>{value}</title>
        </text>
      </g>
    );
  };

  const renderPath = (item, total, startAngle) => {
    var { className } = item;
    var classes = { "DonutChart-path": true };
    var d = getPathData(
      item.data,
      total,
      startAngle,
      props?.width ?? 200,
      props.innerRadius,
      props.outerRadius
    );

    if (className) {
      classes[className] = true;
    }

    return (
      <path
        key={item.data}
        onClick={handleSelect.bind(this, item)}
        onMouseEnter={handleSelect.bind(this, item)}
        className={classSet(classes)}
        d={d}
      ></path>
    );
  };

  const renderSelectedPath = (item, total, startAngle) => {
    var { className, props } = item;
    var classes = {
      "DonutChart-path": true,
      "DonutChart-path--selected": true,
    };
    var d = getPathData(
      item.data,
      total,
      startAngle,
      props.width,
      props.innerRadiusHover,
      props.outerRadiusHover
    );

    if (className) {
      classes[className] = true;
    }

    return <path className={classSet(classes)} d={d}></path>;
  };

  const renderEmptyPath = (item, total, startAngle) => {
    var { className } = item;
    var classes = { "DonutChart-path": true, "DonutChart-path--empty": true };
    var d = getPathData(
      item.data,
      total,
      startAngle,
      props.width,
      props.innerRadius + 0.03,
      props.outerRadius - 0.03
    );

    if (className) {
      classes[className] = true;
    }

    return <path className={classSet(classes)} d={d}></path>;
  };

  const getPathData = (
    data,
    total,
    startAngle,
    width,
    innerRadius,
    outerRadius
  ) => {
    var activeAngle = (data / total) * 360;
    var endAngle = startAngle + activeAngle;
    var largeArcFlagOuter = activeAngle > 180 ? "1 1" : "0 1";
    var largeArcFlagInner = activeAngle > 180 ? "1 0" : "0 0";
    var half = width / 2;
    var outerCoords = getCoordinates(half, outerRadius, startAngle, endAngle);
    var innerCoords = getCoordinates(half, innerRadius, startAngle, endAngle);

    return `M${outerCoords.x1},${outerCoords.y1}
    	${getArc(
        width,
        outerRadius,
        largeArcFlagOuter,
        outerCoords.x2,
        outerCoords.y2
      )} 		
    	L${innerCoords.x2},${innerCoords.y2}
    	${getArc(
        width,
        innerRadius,
        largeArcFlagInner,
        innerCoords.x1,
        innerCoords.y1
      )} z`;
  };

  const toFixed = (number, decimalPlaces) => {
    decimalPlaces = decimalPlaces || 2;
    return (Math.floor(number * 100) / 100).toFixed(decimalPlaces);
  };

  const getCoordinates = (half, radius, startAngle, endAngle) => {
    var x1 = toFixed(
      half + half * radius * Math.cos((Math.PI * startAngle) / 180)
    );
    var y1 = toFixed(
      half + half * radius * Math.sin((Math.PI * startAngle) / 180)
    );
    var x2 = toFixed(
      half + half * radius * Math.cos((Math.PI * endAngle) / 180)
    );
    var y2 = toFixed(
      half + half * radius * Math.sin((Math.PI * endAngle) / 180)
    );

    return { x1, y1, x2, y2 };
  };

  const getArc = (width, radius, largeArcFlag, x, y) => {
    var z = toFixed((width / 2) * radius);

    return `A${z},${z} 0 ${largeArcFlag} ${toFixed(x)},${toFixed(y)}`;
  };

  const handleSelect = (item, e) => {
    props.onSelected(item);
  };

  const { width, height } = props;

  return (
    <svg
      className="DonutChart"
      viewBox={`0 0 ${width} ${height}`}
      onClick={handleClick}
    >
      {renderPaths()}
      {renderText()}
    </svg>
  );
};

export default DonutChart;
// var myChance = new Chance(Date.now());

// var App = React.createClass({
//   getInitialState() {
//     return {
//       showExamples: true,
//       chartWidth: 12.25,
//       defaultValue: "$6,282.32",
//       total: 6282.32,
//       series: [
//         {
//           label: "Housing",
//           value: "$1,208.84",
//           data: 1208.84,
//           selected: false,
//         },
//         { label: "Food", value: "$198.51", data: 198.51, selected: false },
//         { label: "Insurance", value: "$508.62", data: 508.62, selected: false },
//         { label: "Giving", value: "$628.23", data: 628.23, selected: false },
//         {
//           label: "Transportation",
//           value: "$1,208.84",
//           data: 1208.84,
//           selected: false,
//         },
//         { label: "Lifestyle", value: "$500.00", data: 500.0, selected: false },
//         { label: "Debt", value: "$2,029.28", data: 2029.28, selected: false },
//       ],
//     };
//   },
//   componentDidMount: function () {
//     document.addEventListener("click", this.handleDocumentClick);
//   },
//   componentWillUnmount: function () {
//     document.removeEventListener("click", this.handleDocumentClick);
//   },
//   handleDocumentClick(e) {
//     this.setState({
//       series: this.state.series.map((i) => {
//         i.selected = false;
//         return i;
//       }),
//     });
//   },
//   handleSelected(item, e) {
//     var series = this.state.series.map((i) => {
//       i.selected = i.label === item.label;
//       return i;
//     });

//     this.setState({ series });
//   },
//   handleGo() {
//     if (this.timeoutId) {
//       clearTimeout(this.timeoutId);
//     } else {
//       this.timeoutId = setInterval(this.setRandomChartData, 500);
//     }
//   },
//   setRandomChartData() {
//     var groupNames = chance.pick(
//       ["Housing", "Food", "Insurance", "Giving", "Transportation", "Lifestyle"],
//       chance.integer({ min: 0, max: 5 })
//     );
//     var series = [],
//       total = 0;

//     groupNames.forEach((groupName) => {
//       var value = chance.floating({ min: 100, max: 1000 });

//       series.push({
//         label: groupName,
//         value: `$${value.toFixed(2)}`,
//         data: value,
//         selected: false,
//       });
//     });
//     total = series.reduce((memo, g) => memo + g.data, 0);

//     if (series.length && chance.bool()) {
//       series = series.slice(0, series.length - 1);
//     }

//     if (series.length && chance.bool()) {
//       series[
//         chance.integer({ min: 0, max: series.length - 1 })
//       ].selected = true;
//     }

//     this.setState({ total, series });
//   },
//   handleToggleExamples(e) {
//     e.preventDefault();
//     this.setState({ showExamples: !this.state.showExamples });
//   },
//   handleChange(e) {
//     e.nativeEvent.preventDefault();
//     e.nativeEvent.stopPropagation();
//     var nodes = [].slice.call(document.querySelectorAll(".DonutChart"));
//     nodes = nodes.concat([].slice.call(document.querySelectorAll(".Message")));
//     nodes.forEach(function (node) {
//       node.style.width = e.target.value + "rem";
//       node.style.height = e.target.value + "rem";
//     });
//     this.setState({ chartWidth: e.target.value });
//   },
//   render() {
//     var charts = [];

//     charts.push(<DonutChart defaultLabel="Income" defaultValue="$0" />);
//     charts.push(
//       <DonutChart
//         defaultLabel="Income"
//         defaultValue="$6,282.32"
//         total="6282.32"
//       />
//     );
//     charts.push(
//       <DonutChart
//         defaultLabel="Income"
//         defaultValue="$6,282.32"
//         total="6282.32"
//         series={[{ label: "Housing", value: "$1,208.84", data: 1208.84 }]}
//       />
//     );
//     charts.push(
//       <DonutChart
//         defaultLabel="Income"
//         defaultValue="$6,282.32"
//         total="6282.32"
//         series={[
//           { label: "Housing", value: "$1,208.84", data: 1208.84 },
//           { label: "Food", value: "$198.51", data: 198.51 },
//         ]}
//       />
//     );
//     charts.push(
//       <DonutChart
//         defaultLabel="Income"
//         defaultValue="$6,282.32"
//         total="6282.32"
//         series={[
//           { label: "Housing", value: "$1,208.84", data: 1208.84 },
//           { label: "Food", value: "$198.51", data: 198.51 },
//           { label: "Insurance", value: "$508.62", data: 508.62 },
//         ]}
//       />
//     );
//     charts.push(
//       <DonutChart
//         defaultLabel="Income"
//         defaultValue="$6,282.32"
//         total="6282.32"
//         series={[
//           {
//             label: "Housing",
//             value: "$1,208.84",
//             data: 1208.84,
//             selected: true,
//           },
//           { label: "Food", value: "$198.51", data: 198.51 },
//           { label: "Insurance", value: "$508.62", data: 508.62 },
//           { label: "Giving", value: "$628.23", data: 628.23 },
//           { label: "Transportation", value: "$1,208.84", data: 1208.84 },
//           { label: "Lifestyle", value: "$500.00", data: 500.0 },
//           { label: "Debt", value: "$2,029.28", data: 2029.28 },
//         ]}
//       />
//     );
//     charts.push(
//       <DonutChart
//         defaultLabel="Spent"
//         defaultValue="$1,971.84"
//         total="6282.32"
//         startAngle="-90"
//         series={[
//           {
//             label: "Housing",
//             value: "$1,208.84",
//             data: 1208.84,
//             className: "DonutChart-path--spent",
//           },
//           {
//             label: "Food",
//             value: "$198.51",
//             data: 198.51,
//             className: "DonutChart-path--spent",
//           },
//           {
//             label: "Insurance",
//             value: "$508.62",
//             data: 508.62,
//             className: "DonutChart-path--spent",
//           },
//         ]}
//       />
//     );
//     charts.push(
//       <DonutChart
//         defaultLabel="Spent"
//         defaultValue="$1,971.84"
//         total="6282.32"
//         startAngle="-90"
//         series={[
//           {
//             label: "Housing",
//             value: "$1,208.84",
//             data: 1208.84,
//             className: "DonutChart-path--spent",
//           },
//           {
//             label: "Food",
//             value: "$198.51",
//             data: 198.51,
//             selected: true,
//             className: "DonutChart-path--spent",
//           },
//           {
//             label: "Insurance",
//             value: "$508.62",
//             data: 508.62,
//             className: "DonutChart-path--spent",
//           },
//         ]}
//       />
//     );
//     charts.push(
//       <DonutChart
//         defaultLabel="Remaining"
//         defaultValue="$5,452.68"
//         total="6282.32"
//         series={[
//           {
//             label: "Remaining",
//             value: "$5,452.68",
//             data: 5452.68,
//             className: "DonutChart-path--remaining",
//           },
//         ]}
//       />
//     );
//     charts.push(
//       <DonutChart
//         defaultLabel="Really Long Default Label"
//         defaultValue="$5,452.68"
//         total="6282.32"
//         series={[
//           {
//             label: "Remaining",
//             value: "$5,452.68",
//             data: 5452.68,
//             className: "DonutChart-path--remaining",
//           },
//         ]}
//       />
//     );
//     charts.push(
//       <DonutChart
//         defaultLabel="Sticky: -45"
//         defaultValue="$5,452.68"
//         total="6282.32"
//         stickyAngle="-45"
//         series={[{ label: "Sticky", value: "$5,452.68", data: 5452.68 }]}
//       />
//     );
//     charts.push(
//       <DonutChart
//         defaultLabel="Sticky: 135"
//         defaultValue="$800.00"
//         total="6282.32"
//         stickyAngle="135"
//         series={[{ label: "Sticky", value: "$5,452.68", data: 800.0 }]}
//       />
//     );
//     // charts = []; // todo - uncomment

//     return (
//       <div id="app" onClick={this.handleClick}>
//         <input
//           className="DonutChart-range"
//           type="range"
//           min="10"
//           max="30"
//           value={this.state.chartWidth}
//           step="1"
//           onChange={this.handleChange}
//         />
//         <DonutChart {...this.state} onSelected={this.handleSelected} />
//         <div className="Message">
//           <p>The DonutChart on the left is interactive</p>
//           <button onClick={this.handleGo}>GO</button>
//         </div>
//         {charts}
//       </div>
//     );
//   },
// });

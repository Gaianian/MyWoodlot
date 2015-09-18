/*global define,require,$,alert,console */
/*jslint browser:true */
define([], function () {
    'use strict';
    var tools;
    tools = {
        overallOK: true,

        init: function (numOfGroups) {
            // Create the test results display box
            $("head").append("<link href='js/tests/tests.css' rel='stylesheet'>");
            $("body").append("<div id='testsOut'><img id='testsAnchor' src='js/tests/anchor.png'/><div id='testsStatus'></div></div>");

            var i = 0, testsStatusDiv = $("#testsStatus")[0];
            while (i < numOfGroups) {
                $(testsStatusDiv).append("<div id='testStatusBlock" + i + "' class='testStatusBlock'></div>");
                i += 1;
            }
        },

        separateTestUrlParam: function (origURL) {
            var splitString = origURL.split(/test=/);
            return {
                url: splitString[0].replace(/^(\?|&)/, "").replace(/&$/, ""),
                testProps: (splitString[1]
                    ? splitString[1].split(",")
                    : [])
            };
        },

        showStatus: function (groupNum, isOK, testTag) {
            console.log((testTag || ""), isOK);
            if (tools.overallOK) {
                $("#testStatusBlock" + groupNum).css("background-color", isOK
                    ? "#00ff00"
                    : "red");

                // Just alert for the first failure
                if (!isOK) {
                    tools.overallOK = false;
                    alert(testTag);
                }
            } else if (!isOK) {
                $("#testStatusBlock" + groupNum).css("background-color", "red");
            }
        },

        clearStatus: function (groupNum) {
            $("#testStatusBlock" + groupNum).css("background-color", "gray");
        }

    };
    return tools;
});

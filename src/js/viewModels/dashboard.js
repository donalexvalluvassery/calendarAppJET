define(['ojs/ojcore', 'knockout', 'ojs/ojbootstrap', 'ojs/ojresponsiveutils', 'ojs/ojresponsiveknockoututils', 'ojs/ojknockout',
        'ojs/ojdatagrid', 'ojs/ojdatasource-common'],
    function (oj, ko, Bootstrap, ResponsiveUtils, ResponsiveKnockoutUtils) {
        function DataGridModel() {
            /**
             * Create a custom data source requires implementing each method
             * defined in oj.DataGridDataSource. A NxM grid will be created.
             * Row headers with label rN, column headers cM, and cells, N,M.
             *
             * @constructor
             * @extends oj.DataGridDataSource
             * @param {type} rowCount the number of rows to create
             * @param {type} colCount the number of columns to create
             * @returns {NestedHeaderDataGridDataSource}
             */
            function NestedHeaderDataGridDataSource(rowCount, colCount) {
                this.rowCount = 1;
                this.colCount = 7;
                NestedHeaderDataGridDataSource.superclass.constructor.call(this);
            }
            // Subclass from oj.DataGridDataSource
            oj.Object.createSubclass(NestedHeaderDataGridDataSource,
                oj.DataGridDataSource, 'oj.NestedHeaderDataGridDataSource');

            /**
             * Returns the total number of rows or columns.
             * @param {string} axis the axis in which we inquire for the total
             *                 count valid values are "row" and "column".
             * @return {number} the total number of rows/columns.
             */
            NestedHeaderDataGridDataSource.prototype.getCount = function (axis) {
                if (axis === 'column') {
                    return this.colCount;
                } else if (axis === 'row') {
                    return this.rowCount;
                }
                return 0;
            };

            /**
             * Fetch a range of headers from the data source. Need to pass a
             * HeaderSet back using the callbacks.success property
             *
             * @param {Object} headerRange information about the header range, it
             *                 must contain the following properties: axis,
             *                 start, count.
             * @param {Object} callbacks the callbacks to be invoke when fetch
             *                 headers operation is completed. The valid
             *                 callback types are "success" and "error".
             * @param {Object=} callbackObjects the object in which the callback
             *        function is invoked on. This is optional. You can specify the
             *        callback object for each callbacks using the "success" and
             *        "error" keys.
             */
            NestedHeaderDataGridDataSource.prototype.fetchHeaders = function (
                headerRange, callbacks, callbackObjects) {
                var axis = headerRange.axis;
                var start = headerRange.start;
                var count = headerRange.count;
                var end = start;

                if (axis === 'column') {
                    end = Math.min((start + count) - 1, this.colCount - 1);
                } else if (axis === 'row') {
                    end = Math.min((start + count) - 1, this.rowCount - 1);
                }
                // create a headerSet
                var headerSet = new NestedHeaderSet(axis, start, end);
                callbacks.success.call(callbackObjects.success, headerSet,
                    headerRange, null);
            };

            /**
             * Fetch a range of cells from the data source. Need to pass a CellSet
             * back using the callbacks.success property
             *
             * @param {Array.<Object>} cellRange Information about the cell range.
             *        A cell range is defined by an array of range info for each
             *        axis, where each range contains three properties: axis,
             *        start, count.
             * @param {Object} callbacks the callbacks to be invoke when fetch
             *        cells operation is completed.  The valid callback types
             *        are "success" and "error".
             * @param {Object=} callbackObjects the object in which the callback
             *        function is invoked on.  This is optional. You can specify
             *        the callback object for each callbacks using the "success"
             *        and "error" keys.
             */
            NestedHeaderDataGridDataSource.prototype.fetchCells = function (cellRanges,
                                                                            callbacks, callbackObjects) {
                // if there is no range specified then signal an error
                if (cellRanges === null || cellRanges.length < 2) {
                    callbacks.error.call(callbackObjects.error, cellRanges);
                }

                for (var i = 0; i < cellRanges.length; i++) {
                    var cellRange = cellRanges[i];
                    if (cellRange.axis === 'row') {
                        var rowStart = cellRange.start;
                        var rowCount = cellRange.count;
                    } else if (cellRange.axis === 'column') {
                        var colStart = cellRange.start;
                        var colCount = cellRange.count;
                    }
                }

                var rowEnd = Math.min((rowStart + rowCount) - 1, this.rowCount - 1);
                var colEnd = Math.min((colStart + colCount) - 1, this.colCount - 1);

                if (rowEnd === -1) {
                    colEnd = -1;
                } else if (colEnd === -1) {
                    rowEnd = -1;
                }

                var cellSet = new NestedCellSet(rowStart, rowEnd, colStart,
                    colEnd);
                callbacks.success.call(callbackObjects.success, cellSet,
                    cellRanges);
            };

            /**
             * Returns the keys based on the indexes.
             * @param {Object} indexes the index for each axis
             * @return {Object.<Object, Object>} an object containing the keys for
             *                                   each axis
             * @export
             */
            NestedHeaderDataGridDataSource.prototype.keys = function (indexes) {
                var rowKey = null;
                var columnKey = null;
                var rowIndex = indexes.row;
                var columnIndex = indexes.column;

                if (rowIndex >= 0) {
                    rowKey = 'r' + rowIndex;
                }
                if (columnIndex >= 0) {
                    columnKey = 'c' + columnIndex;
                }
                return { row: rowKey, column: columnKey };
            };

            /**
             * Returns the indexes based on the keys.
             * @param {Object} keys the key for each axis
             * @return {Object.<number>} an object containing the indexes for
             *                                   each axis
             * @export
             */
            NestedHeaderDataGridDataSource.prototype.indexes = function (keys) {
                var rowIndex = null;
                var columnIndex = null;
                var rowKey = keys.row;
                var columnKey = keys.column;

                if (rowKey) {
                    rowIndex = parseInt(rowKey.slice(1), 10);
                }
                if (columnKey) {
                    columnIndex = parseInt(columnKey.slice(1), 10);
                }
                return { row: rowIndex, column: columnIndex };
            };

            /**
             * Determines whether this DataGridDataSource supports certain feature.
             * @param {string} feature the feature in which its capabilities is inquired.  Currently the only valid feature is "sort".
             * @return {string|null} the name of the feature.  For "sort", the valid return values are: "full", "none", "row", "column".
             *         For "move", the valid return values are: "row", "none".
             *         Returns null if the feature is not recognized.
             */
            NestedHeaderDataGridDataSource.prototype.getCapability = function (feature) {
                return null;
            };

            /**
             * Returns whether the total count returned in getCount function is an actual or an estimate.
             * @param {string} axis the axis in which we inquire whether the total count is an estimate.  Valid values are
             *        "row" and "column".
             * @return {string} "exact" if the count returned in getCount function is the actual count, "estimate" if the
             *         count returned in getCount function is an estimate.  The default value is "exact".
             */
            NestedHeaderDataGridDataSource.prototype.getCountPrecision = function (axis) {
                return 'exact';
            };

            /**
             * Create a headerSet to pass back in the fetchHeaders callback.
             * Modifying the headerSet implementation will allow you to create
             * nested headers. Specify return values in getDepth, getExtent,
             * and getLevelCount to build a nested header structure.
             */
            function NestedHeaderSet(axis, start, end) {
                this.axis = axis;
                this.start = start;
                this.end = end;
            }

            /**
             * Gets the data of the specified index.  An error is throw when 1) the
             * range is not yet available and 2) the index specified is out of
             * bounds.
             * @param {number} index the absolute index of the header in which we
             *                 want to retrieve the header from.
             * @param {number=} level the level of the header, 0 is the outermost
             *                  header and increments by 1 moving inward
             * @return {Object} the data object for the specific index.
             */
            NestedHeaderSet.prototype.getData = function (index, level) {
                var start = this._getStartIndex(index, level);

                if (this.axis === 'row') {
                    return 'R' + start + 'L' + level;
                } else if (this.axis === 'column') {
                    return 'C' + start + 'L' + level;
                }
                return null;
            };

            /**
             * Gets the metadata of the specified index.  An error is throw when 1)
             * the range is not yet available and 2) the index specified is out of
             * bounds. The metadata that the data source can optionally return are:
             *  1) sortDirection - the initial sort direction of the header. Valid
             *                  values are "ascending" and "descending".
             *  2) key - the key of the row/column header.
             * @param {number} index the absolute index of the header in which we
             *                  want to retrieve the metadata from.
             * @param {number=} level the level of the header, 0 is the outermost
             *                  header and increments by 1 moving inward
             * @return {Object} the metadata object for the specific index.
             */
            NestedHeaderSet.prototype.getMetadata = function (index, level) {
                var start = this._getStartIndex(index, level);

                if (this.axis === 'row') {
                    return this.getLevelCount() - 1 === level ? { key: 'r' + start } :
                        { key: 'r' + start + 'L' + level };
                } else if (this.axis === 'column') {
                    return this.getLevelCount() - 1 === level ? { key: 'c' + start } :
                        { key: 'c' + start + 'L' + level };
                }
                return null;
            };

            /**
             * Gets the actual count of the result set, the total indexes spanned
             * by the headerSet along the innermost header.
             * @return {number} the actual count of the result set.
             */
            NestedHeaderSet.prototype.getCount = function () {
                return (this.end - this.start) + 1;
            };

            /**
             * Gets the actual number of levels of the result set for the
             * specified axis. The levels are the counted from the outermost
             * header indexed at 0, and moving inwards toward the databody would
             * increment the level by 1.
             * @return {number} the number of levels of the result set
             */
            NestedHeaderSet.prototype.getLevelCount = function () {
                if (this.getCount() > 0) {
                    return 3;
                }
                return 0;
            };

            /**
             * Gets the extent of an index on a particular level within the context
             * of the headerSet. Extent is defined as the number of indexes covered
             * by the header. If the extent extends beyond the start and end of the
             * requested range the extent should be trimmed to the edge of the
             * requested range and the object for {'more': {before, after}} should
             * have the value appropriate boolean set. For innermost headers the
             * extent will always be 1.
             * @param {number} index the absolute index along the innermost header
             *      of the extent to get, 0 is the first header in the data source
             * @param {number=} level the level of the header, 0 is the outermost
             *      header and increments by 1 moving inward
             * @return {Object} an object containing two values
             *      extent: the number of absolute indexes spanned by the header
             *              at this index bounded by the edges of the result set
             *              for the specified axis.
             *      more: object with keys 'before'/'after' and boolean values
             *            true/false representing whether there are more indexes
             *            before/after what is in the headerSet
             */
            NestedHeaderSet.prototype.getExtent = function (index, level) {
                var extent;
                var start;
                var end;
                var before;
                var after;
                if (level === 0) {
                    // extent of 6 on outer level
                    extent = 6;
                } else if (level === 1) {
                    // extent of 3 on middle level
                    extent = 3;
                } else {
                    // extent of 1 on innermost
                    extent = 1;
                }

                start = this._getStartIndex(index, level);
                end = (start + extent) - 1;
                before = index > start;
                after = index < (start + extent) - 1;

                if (start < this.start) {
                    // Need to subtract this overage from the extent
                    extent -= (this.start - start);
                }
                if (end > this.end) {
                    // true extent overruns the header set--adjust it down by that much
                    extent -= (end - this.end);
                }
                return { extent: extent, more: { before: before, after: after } };
            };

            /**
             * Gets the depth of an index starting at a particular level. The depth
             * is the number of levels spanned by the header.
             * @param {number} index the absolute index of the depth to get
             * @param {number=} level the level of the header, 0 is the outermost
             *      header
             * @return {number} the number of levels spanned by the header at the
             *      specified position
             */
            NestedHeaderSet.prototype.getDepth = function (index, level) {
                return 1;
            };

            /**
             * Gets the label for the level along the axis of that header. Specify null to have no header labels.
             * @param {number} level the header level to retrieve the label data for
             * @return {*} the data for the header label
             */
            NestedHeaderSet.prototype.getLabel = function (level) {
                if (this.axis === 'row') {
                    return 'RHLevel ' + level;
                }
                if (this.axis === 'column') {
                    return 'CHLevel ' + level;
                }
                return null;
            };

            /**
             * Helper method to get the start index of the header
             * @param {number} index the absolute index of the depth to get
             * @param {number=} level the level of the header, 0 is the outermost
             *      header
             * @return {number} the start index of the header
             */
            NestedHeaderSet.prototype._getStartIndex = function (index, level) {
                if (level === 0) {
                    return (index - (index % 6));
                } else if (level === 1) {
                    return (index - (index % 3));
                }
                return index;
            };

            function NestedCellSet(startRow, endRow, startCol, endCol) {
                this.startRow = startRow;
                this.endRow = endRow;
                this.startCol = startCol;
                this.endCol = endCol;
            }

            NestedCellSet.prototype.getData = function (indexes) {
                return indexes.row + ',' + indexes.column;
            };

            NestedCellSet.prototype.getMetadata = function (indexes) {
                var keys = { row: 'r' + indexes.row,
                    column: 'c' + indexes.column };
                return { keys: keys };
            };

            NestedCellSet.prototype.getStart = function (axis) {
                if (axis === 'row') {
                    return this.m_startRow;
                }

                if (axis === 'column') {
                    return this.m_startCol;
                }
                return 0;
            };

            NestedCellSet.prototype.getCount = function (axis) {
                if (axis === 'row') {
                    return (this.endRow - this.startRow) + 1;
                } else if (axis === 'column') {
                    return (this.endCol - this.startCol) + 1;
                }
                return 0;
            };

            NestedCellSet.prototype.getExtent = function (indexes) {
                return { row: { extent: 1, more: { before: false, after: false } },
                    column: { extent: 1, more: { before: false, after: false } } };
            };

            this.data = new NestedHeaderDataGridDataSource(102, 102);
            this.rowHeaderRenderer = function (headerContext) {
                // container div to rotate the text
                var container = document.createElement('div');
                if (headerContext.level !== 2) {
                    container.className = 'demo-content-container';
                }
                container.appendChild(
                    document.createTextNode(headerContext.data));
                return { insert: container };
            };
            this.rowHeaderStyle = function (headerContext) {
                if (headerContext.level !== 2) {
                    return 'width:2.25em;height:4.166em';
                }
                return '';
            };
            this.labelRenderer = function (headerContext) {
                return { insert: headerContext.level.toString() };
            };
            var smQuery = ResponsiveUtils.getFrameworkQuery(
                ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);

            this.small = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
        }

        return new DataGridModel();
    });
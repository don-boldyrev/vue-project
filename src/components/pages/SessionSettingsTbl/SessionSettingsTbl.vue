<template>
	<div :class="{'content-container': !isMobile}"  ref="contentContainer">
		<div :class="{'content-section': !isMobile}" ref="contentSection">
			<div class="page session-settings-page">
				<div class="page-title">Sessions</div>
				<div class="filters-container clearfix">
					<div @click="updateTable(1)" class="filter-btn" :class="{active: filterType === 1}">Future</div>
					<div @click="updateTable(2)" class="filter-btn" :class="{active: filterType === 2}">Expired</div>
					<div @click="updateTable(3)" class="filter-btn" :class="{active: filterType === 3}">Active</div>
					<div @click="openEdit()" class="add-btn">Add new session</div>
				</div>

				<v-data-table
					:headers="headers"
					:items="eventsArr"
					:pagination.sync="pagination"
					hide-actions
					must-sort
				>
					<template slot="items" slot-scope="{ item }">
					<td @click="openEdit(item['Id'])">{{ item['EventName'] }}</td>
					<td @click="openEdit(item['Id'])">{{ item['SessionRoom'] }}</td>
					<td @click="openEdit(item['Id'])">{{ item['SessionName'] }}</td>
					<td @click="openEdit(item['Id'])">{{ item['SessionDateTimeStart_StrDataTable'] }}</td>
					<td @click="openEdit(item['Id'])">{{ item['SessionDateTimeEnd_StrDataTable'] }}</td>
					<td>
						<span class="delete-session" @click="removeSession(item['Id'])"></span>
					</td>
					</template>
				</v-data-table>
				<div class="pagination clearfix">
					<div class="pagination-info">
						{{startPageCount}} - {{endPageCount}} of {{pagination.totalItems}}
					</div>
					<div class="pagination-content">
						<v-pagination 
							v-model="pagination.page" 
							:length="pages"
							:total-visible="7"
						></v-pagination>
					</div>
				</div>
				<div class="copyright">© 2018 - News Quantified LLC</div>
			</div>
		</div>
	</div>
</template>

<script>
import pageWraperMixin from '@/components/mixins/pageWraperMixin'
import swal from 'sweetalert'
export default {
	name: 'SessionSettingsTbl',
	mixins: [pageWraperMixin],
	data () {
		return {
			pagination: {
				page: 1,
				rowsPerPage: 50,
				totalItems: 0
			},
			headers: [
				{ text: 'Event name', value: 'EventName', width: 300 },
				{ text: 'Room', value: 'SessionRoom', width: 45 },
				{ text: 'Session name', value: 'SessionName' },
				{ text: 'Session start time', value: 'SessionDateTimeStart_StrDataTable', width: 150 },
				{ text: 'Session end time', value: 'SessionDateTimeEnd_StrDataTable', width: 150 },
				{ text: '', value: 'Id', width: 10, sortable: false}
			],
			eventsArr: [],
			filterType: 0
		}
	},
	created () {
		this.updateTable()
	},
	computed: {
		pages () {
			if (this.pagination.rowsPerPage == null ||
				this.pagination.totalItems == null
			) return 0

			return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
		},
		startPageCount () {
			if (!this.pagination.totalItems) return 0
			return (this.pagination.page - 1) * this.pagination.rowsPerPage + 1
		},
		endPageCount () {
			if (!this.pagination.totalItems) return 0
			if (this.pagination.page * this.pagination.rowsPerPage > this.pagination.totalItems) {
				return this.pagination.totalItems
			}
			return this.pagination.page * this.pagination.rowsPerPage
		}
	},
	methods: {
		openEdit (id) {
			let routeData = this.$router.resolve({path: '/SessionSettings/Edit' + (id ? '/' + id: '')})
			window.open(routeData.href, '_blank')
		},
		removeSession (id) {
			swal({
				title: "Are you sure you want to remove the session?",
				icon: "warning",
				buttons: true,
				dangerMode: true,
			})
			.then(isDelete => {
				if (isDelete) {
					this.$http.post('/SessionSettings/DeleteSessionSettingItem', {id}).then(response => {
						return response.json()
					}).then(json => {
						if (json === 'Success') {
							this.updateTable()
						}
					})
				}
			})
		},
		updateTable (type) {
			this.filterType = type
			const params = {}
			if (this.filterType) {
				params.type = this.filterType
			}
			this.$http.get('/SessionSettings/GetSessionSettings', {params: params}).then(response => {
				return response.json()
			}).then (json => {
				this.eventsArr = json
				this.pagination.page = 1
				this.pagination.totalItems = json.length
			})
		}
	}
}
</script>

<style>
	/*table*/
	table.v-table {
		border-bottom: 1px solid #111;
		border-collapse: unset;
	}
	.v-table th,
	.v-table td {
		box-sizing: content-box;
		-webkit-box-sizing: content-box;
		-moz-box-sizing: content-box;
	}

	table.v-table thead tr {
		height: auto;
	}

	table.v-table tbody td {
		height: auto;
		cursor: pointer;
	}
	
	table.v-table thead th:not(:nth-child(1)),
	table.v-table thead th:first-child {
		padding: 10px 18px;
	}
	
	table.v-table tbody td:not(:nth-child(1)),
	table.v-table tbody td:first-child {
		padding: 8px 10px;
	}
	
	.v-datatable.v-table thead {
		background-color: #fbfbfb;
	}
	.v-datatable.v-table thead th {
		border: none;
		border-bottom: 1px solid #f1f1f2;
		font-family: Roboto, sans-serif;
		font-size: 14px;
		color: #aeb6b5;
		font-weight: 500;
		line-height: 18px;
		text-align: left;
		text-transform: uppercase;
		background-repeat: no-repeat;
		background-position: center right;
	}	
	.v-datatable thead th.column.sortable i {
		display: none;
	}
	.v-datatable thead th.column.sortable {
		background-image: url(/Content/DataTables-1.10.18/DataTables-1.10.18/images/sort_both.png);
	}
	.v-datatable thead th.column.sortable.asc {
		background-image: url(/Content/DataTables-1.10.18/DataTables-1.10.18/images/sort_asc.png);
	}
	.v-datatable thead th.column.sortable.desc {
		background-image: url(/Content/DataTables-1.10.18/DataTables-1.10.18/images/sort_desc.png);
	}
	table.v-table tbody td {
		font-family: Roboto Condensed, sans-serif;
		text-align: left;
		border: none;
		border-bottom: 1px solid #f1f1f2;
		font-size: 18px;
	}

	.v-datatable.v-table tbody tr:hover:not(.v-datatable__expand-row) {
		background: none;
	}
	.v-datatable.v-table tbody tr:hover:nth-child(even):not(.v-datatable__expand-row) {
		background-color: #fbfbfb;
	}
	table.v-table tbody tr:nth-child(even) {
		background-color: #fbfbfb;
	}
	/*end table*/

	/*pagination*/
	.pagination {
		position: relative;
	}
	.pagination-content {
		max-width: 350px;
		padding-top: 4px;
		margin: 0 auto;
	}
	.pagination-content .v-pagination .v-pagination__navigation,
	.pagination-content .v-pagination .v-pagination__item {
		box-shadow: none;
		-webkit-box-shadow: none;
		border: 0;
		border-radius: 0;
		width: auto;
		height:auto;
		min-width: 1em;
		font-family: Roboto, sans-serif;
		font-size: 16px;
		padding: 0.2em 0.6em;
		cursor: pointer;
		color: #333;
		background: none;
		margin: 2px;
		position: relative;
		line-height: 1.5;
	}
	.pagination-content .v-pagination .v-pagination__navigation:focus,
	.pagination-content .v-pagination .v-pagination__item:focus {
		outline: none;
	}

	.pagination-content .v-pagination .v-pagination__item:hover {
		background-color: #aeb6b5;
		color: #fff;
	}
	.pagination-content .v-pagination .v-pagination__item--active {
		background-color: #aeb6b5 !important;
		color: #fff;
	}
	.pagination-content .v-pagination .v-pagination__navigation .v-icon {
		display: none;
	}
	.pagination-content .v-pagination > li:first-child .v-pagination__navigation:before {
		content: "Back"
	}
	.pagination-content .v-pagination > li:first-child .v-pagination__navigation:after {
		content: "";
		display: block;
		width: 6px;
		height: 9px;
		position: absolute;
		top: 10px;
		left: -1px;
		background: url(/images/css_sprites.png) -88px -10px;
	}
	.pagination-content .v-pagination > li:last-child .v-pagination__navigation:before {
		content: "Next"
	}
	.pagination-content .v-pagination > li:last-child .v-pagination__navigation:after {
		content: "";
		display: block;
		width: 6px;
		height: 9px;
		position: absolute;
		top: 10px;
		right: -1px;
		background: url(/images/css_sprites.png) -10px -79px;
	}
	.pagination-content .v-pagination .v-pagination__navigation:not(.v-pagination__navigation--disabled):hover {
		background-color: #aeb6b5;
		color: #fff;
	}
	.pagination-info {
		padding-top: 0.755em;
		position: absolute;
		font-family: Roboto, sans-serif;
		font-size: 16px;
		font-weight: 500;
	}
	/*end pagination*/
	
</style>

<style scoped>
	.page-title {
		font-size: 30px;
		margin-bottom: 10px;
		font-family: Roboto, sans-serif;
	}
	.filters-container {
		margin-bottom: 10px;
	}
	.filter-btn, .add-btn {
		min-width: 150px;
		padding-left: 15px;
		padding-right: 15px;
		height: 44px;
		line-height: 34px;
		font-family: Roboto, sans-serif;
		font-size: 18px;
		font-weight: 500;
		border: 5px solid #39b54a;
		float: left;
		color: #000;
		text-decoration: none;
		text-align: center;
		border-radius: 3px;
		margin-right: 10px;
		cursor: pointer;
	}
	.filter-btn.active {
		background-color: #39b54a;
		color: #f1f1f2;
	}
	.add-btn {
		border: 0;
		line-height: 44px;
		background-color: #39b54a;
		float: right;
		color: #f1f1f2;
		text-decoration: none;
	}
	.delete-session {
		display: block;
		width: 16px;
		height: 16px;
		background-image: url(/images/cross-remove-sign.png);
	}
	.copyright {
		font-family: Roboto, sans-serif;
		font-size: 16px;
		margin-top: 40px;
		color: #333333;
	}
</style>